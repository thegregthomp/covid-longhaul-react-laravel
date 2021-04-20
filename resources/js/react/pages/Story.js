import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Container from "../components/Container";
const { DateTime } = require("luxon");
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOptions } from "../store/rootSlice";
import Loading from "../components/loading";
import find from "lodash/find";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";

const Story = props => {
    let [initialized, setInitialized] = useState(false);
    let [story, setStory] = useState(null);
    let { data } = useSelector(state => state.root.options);
    let { postId } = useParams();

    const getLabel = tag => {
        let fetch = find(data.symptoms, function(o) {
            return o.value == tag;
        });
        return fetch.label;
    };

    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
            try {
                const result = await API.get(`/posts/${postId}`, {});
                if (!didCancel) {
                    setInitialized(true);

                    setStory(result.data.data);
                }
            } catch (error) {
                if (!didCancel) {
                }
            }
        };
        fetchData();
        return () => {
            didCancel = true;
        };
    }, [postId]);

    return (
        <Container>
            {!initialized ? (
                <Loading></Loading>
            ) : (
                <>
                    {story?.id && (
                        <div className="py-0 md:py-4" key={story.title}>
                            <article className="xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                                <dl>
                                    <span
                                        className={
                                            "text-base leading-6 text-gray-500"
                                        }
                                    >
                                        {DateTime.fromISO(
                                            story.created_at
                                        ).toFormat("DDD")}
                                    </span>
                                    <div className="hidden about md:flex flex-col mt-6">
                                        <h3 className="mb-3 text-sm">
                                            About
                                        </h3>
                                        <div className="mb-2">
                                            <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Age:</span>
                                            <span className="block text-md text-gray-900">{story.age}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Gender:</span>
                                            <span className="block text-md text-gray-900">{story.gender}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Race:</span>
                                            <span className="block text-md text-gray-900">{story.race}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Weight:</span>
                                            <span className="block text-md text-gray-900">{story.weight}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Country:</span>
                                            <span className="block text-md text-gray-900">{story.country}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Date Infected:</span>
                                            <span className="block text-md text-gray-900">{story.infected_date}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Fully Recovered?:</span>
                                            <span className="block text-md text-gray-900">{(story.fully_recovered)?'Yes':'No'}</span>
                                        </div>
                                        {(story.fully_recovered != 1) &&
                                            <div className="mb-2">
                                                <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Recovery Percentage:</span>
                                                <span className="block text-md text-gray-900">{story.recovery_percentage}</span>
                                            </div>
                                        }
                                    </div>
                                    <div className="hidden md:flex flex-col">
                                        <div className="mt-6">
                                            <h3 className="mb-3 text-sm">
                                                Symptoms
                                            </h3>
                                            <div className="gap-2 flex flex-wrap">
                                                {story.symptoms.map(symptom => (
                                                    <span
                                                        key={symptom}
                                                        className="inline-block py-1 px-3 text-sm bg-indigo-100 rounded-md"
                                                    >
                                                        {symptom}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <h3 className="mb-3 text-sm">
                                                Treatments
                                            </h3>
                                            <div className="gap-2 flex flex-wrap">
                                                {story.treatments.map(treatment => (
                                                    <span
                                                        key={treatment}
                                                        className="inline-block py-1 px-3 text-sm bg-green-100 rounded-md"
                                                    >
                                                        {treatment}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </dl>
                                <div className="xl:col-span-3 mt-4 md:mt-0">
                                    <div className="space-y-3 mb-5 md:mb-0">
                                        <h2 className="text-2xl md:text-3xl">
                                            <Link
                                                to={`/story/${story.id}`}
                                                className={
                                                    "hover:text-indigo-500"
                                                }
                                            >
                                                {story.title}
                                            </Link>
                                        </h2>
                                        <span className="text-sm text-gray-500 mt-1 md:mt-2">
                                            By: {story.name}
                                        </span>
                                        <div
                                            className="story prose max-w-none text-gray-800 pb-4 md:pb-0 border-b border-gray-300 md:border-none"
                                            dangerouslySetInnerHTML={{
                                                __html: story.story
                                            }}
                                        ></div>
                                    </div>
                                    <div className="about flex flex-col md:hidden">
                                        <h3 className="mb23 text-md md:text-sm">
                                            About
                                        </h3>
                                        <div className="flex flex-wrap">
                                            <div className="py-2 px-3 mr-2 mb-2 bg-gray-100 rounded-md">
                                                <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Age:</span>
                                                <span className="block text-md text-gray-900">{story.age}</span>
                                            </div>
                                            <div className="py-2 px-3 mr-2 mb-2 bg-gray-100 rounded-md">
                                                <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Gender:</span>
                                                <span className="block text-md text-gray-900">{story.gender}</span>
                                            </div>
                                            <div className="py-2 px-3 mr-2 mb-2 bg-gray-100 rounded-md">
                                                <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Race:</span>
                                                <span className="block text-md text-gray-900">{story.race}</span>
                                            </div>
                                            <div className="py-2 px-3 mr-2 mb-2 bg-gray-100 rounded-md">
                                                <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Weight:</span>
                                                <span className="block text-md text-gray-900">{story.weight}</span>
                                            </div>
                                            <div className="py-2 px-3 mr-2 mb-2 bg-gray-100 rounded-md">
                                                <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Country:</span>
                                                <span className="block text-md text-gray-900">{story.country}</span>
                                            </div>
                                            <div className="py-2 px-3 mr-2 mb-2 bg-gray-100 rounded-md">
                                                <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Date Infected:</span>
                                                <span className="block text-md text-gray-900">{story.infected_date}</span>
                                            </div>
                                            <div className="py-2 px-3 mr-2 mb-2 bg-gray-100 rounded-md">
                                                <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Fully Recovered?:</span>
                                                <span className="block text-md text-gray-900">{(story.fully_recovered)?'Yes':'No'}</span>
                                            </div>
                                            {(story.fully_recovered != 1) &&
                                                <div className="py-2 px-3 mr-2 mb-2 bg-gray-100 rounded-md">
                                                    <span className="inline-block text-sm text-gray-700 border-b border-indigo-500 pb-0.5 mb-0.5">Recovery Percentage:</span>
                                                    <span className="block text-md text-gray-900">{story.recovery_percentage}</span>
                                                </div>
                                            }</div>
                                    </div>
                                    <div className="flex md:hidden flex-col">
                                        <div className="mt-6">
                                            <h3 className="mb-2 text-md md:text-sm">
                                                Symptoms
                                            </h3>
                                            <div className="flex flex-wrap">
                                                {story.symptoms.map(symptom => (
                                                    <span
                                                        key={symptom}
                                                        className="inline-block py-1 px-3 text-sm bg-indigo-100 rounded-md mr-2 mb-2"
                                                    >
                                                        {symptom}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="mb-2 text-md md:text-sm">
                                                Treatments
                                            </h3>
                                            <div className="flex flex-wrap">
                                                {story.treatments.map(treatment => (
                                                    <span
                                                        key={treatment}
                                                        className="inline-block py-1 px-3 text-sm bg-green-100 rounded-md mr-2 mb-2"
                                                    >
                                                        {treatment}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};

export default Story;
