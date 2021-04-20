import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Container from "../components/Container";
import algoliasearch from "algoliasearch/lite";
const { DateTime } = require("luxon");
import Truncate from "react-truncate";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOptions } from "../store/rootSlice";
import Loading from "../components/loading";
import find from "lodash/find";
import { Link } from "react-router-dom";
import {
    InstantSearch,
    Hits,
    Highlight,
    connectSearchBox,
    connectPagination
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
    "1UXY2T39W4",
    "af28cd984fa1d1af9df473c96e6bcc0a"
);

const Pagination = ({ currentRefinement, nbPages }) => (
    <ul className = "pb-5">
        {new Array(nbPages).fill(null).map((_, index) => {
            const page = index + 1;
            // const style = {
            //   fontWeight: currentRefinement === page ? 'bold' : '',
            // };
            return (
                <li key={index}>
                    <a
                        href="#"
                        className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-md font-medium ${
                            currentRefinement
                                ? "border-indigo-500 text-indigo-600"
                                : ""
                        }}`}
                    >
                        {page}
                    </a>
                </li>
            );
        })}
    </ul>
);

const CustomPagination = connectPagination(Pagination);

const Hit = ({ hit }) => {
    let longText = hit.story.replace(/(<([^>]+)>)/gi, "");
    let symptoms = hit.symptoms.split(",");
    let { data } = useSelector(state => state.root.options);
    let history = useHistory();

    const getLabel = tag => {
        let fetch = find(data.symptoms, function(o) {
            return o.value == tag;
        });
        return fetch.label;
    };

    return (
        <div className="py-6 lg:py-10" key={hit.title}>
            <article className="xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                <dl>
                    <span className={"text-base leading-6 text-gray-500"}>
                        {DateTime.fromMillis(hit.created_at * 1000).toFormat(
                            "DDD"
                        )}
                    </span>
                </dl>
                <div className="xl:col-span-3">
                    <div className="space-y-3">
                        <h2 className="text-2xl">
                            <Link to={`/story/${hit.id}`} className={"hover:text-indigo-500"}>
                                {hit.title}
                            </Link>
                        </h2>
                        <span className="text-sm text-gray-500">
                            By: {hit.name}
                        </span>
                        <div className="story prose max-w-none text-gray-800">
                            <Truncate
                                lines={2}
                                ellipsis={
                                    <span>
                                        ...{" "}
                                        <Link
                                            className="underline text-indigo-500 hover:text-indigo-700"
                                            to={`/story/${hit.id}`}
                                        >
                                            Read more
                                        </Link>
                                    </span>
                                }
                            >
                                {longText}
                            </Truncate>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-full">
                            {/* <span className="serif-font text-sm text-gray-800">Symptoms</span> */}
                            <div className="symptom-container mt-4 flex">
                                {symptoms.map(symptom => (
                                    <span
                                        key={symptom}
                                        className="inline-block py-1 px-3 text-sm bg-indigo-100 rounded-md mr-2 mb-2"
                                    >
                                        {getLabel(symptom)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-6">
                        <button
                            type="button"
                            className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={()=>{
                                history.push(`/story/${hit.id}`)
                            }}
                        >
                            <span>Read</span>
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
};

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
    let { initialized, data } = useSelector(state => state.root.options);
    return (
        <form noValidate action="" role="search" className="max-w-3xl mx-auto">
            <div className="mx-auto w-full px-4">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="relative text-gray-300 focus-within:text-indigo-500">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <svg
                            className="h-5 w-5"
                            x-description="Heroicon name: solid/search"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <input
                        id="search"
                        type="search"
                        disabled={!initialized}
                        value={currentRefinement}
                        onChange={event => refine(event.currentTarget.value)}
                        className="block w-full text-white text-lg md:text-xl bg-white py-4 pl-10 pr-5 border border-gray-300 rounded-md leading-5 focus:text-gray-900 placeholder-gray-300 focus:outline-none focus:border-indigo-500 focus:placeholder-gray-500 focus:ring-0 "
                        placeholder="Search"
                        type="search"
                        name="search"
                    />
                </div>
            </div>
        </form>
    );
};

const CustomSearchBox = connectSearchBox(SearchBox);

const Home = props => {
    const dispatch = useDispatch();
    let history = useHistory();
    let { initialized, data } = useSelector(state => state.root.options);
    useEffect(() => {
        const promise = dispatch(fetchOptions());
        promise.then(() => {
            //is initialized
        });
        return () => {};
    }, [dispatch]);
    return (
        <InstantSearch searchClient={searchClient} indexName="posts">
            <div>
                <div className="w-full flex border-b border-gray-200 py-6 bg-gray-50 sm:py-8">
                    <div className="w-full mx-auto">
                        <CustomSearchBox />
                    </div>
                </div>
                <Container>
                    {!initialized ? (
                        <Loading></Loading>
                    ) : (
                        <>
                            <div className="divide-y divide-gray-200">
                                <div className="divide-y divide-gray-200">
                                    <Hits hitComponent={Hit} />
                                </div>
                            </div>
                            <div className="mt-6 mb-4 flex w-full items-center justify-center border-t border-gray-200 pt-6">
                                <CustomPagination></CustomPagination>
                            </div>
                        </>
                    )}
                </Container>
            </div>
        </InstantSearch>
    );
};

export default Home;
