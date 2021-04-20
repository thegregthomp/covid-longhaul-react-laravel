import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ShareStory from "./pages/ShareStory";
import Story from "./pages/Story";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route, NavLink, useHistory, withRouter, Link } from "react-router-dom";
import { ModalContainer } from 'reoverlay';

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon, PlusIcon } from "@heroicons/react/outline";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const StoryButton = () => {
    let history = useHistory();

    function handleClick() {
        history.push("/share-story");
    }

    return (
        <div className="flex-shrink-0 hidden sm:flex">
            <button
                type="button"
                className="ml-6 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleClick}
            >
                <PlusIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                />
                <span>
                    Share Your Story
                </span>
            </button>
        </div>
    )

}

const App = props => {

    function handleClick() {
        history.push("/share-story");
      }
    return (
        <Router>
            <div className="pb-8">
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Disclosure as="nav" className="bg-white shadow">
                    {({ open }) => (
                        <>
                            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between h-16">
                                    <div className="flex w-full justify-between">
                                        <div className="flex-shrink-0 flex items-center">
                                            <Link
                                                to="/"
                                                className="flex-shrink-0 flex items-center"
                                                >
                                                <img
                                                    className="h-8 w-auto"
                                                    src="/img/icon.svg"
                                                    alt="Workflow"
                                                />
                                                <span className="serif-font text-xl font-bold ml-2">
                                                    Long-haulers
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="hidden sm:ml-6 sm:flex flex-end sm:space-x-8">
                                                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                                <NavLink
                                                    exact
                                                    activeClassName="border-indigo-500 border-b-2"
                                                    to="/"
                                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                                >
                                                    Stories
                                                </NavLink>
                                                <NavLink
                                                    activeClassName="border-indigo-500 border-b-2"
                                                    to="/about"
                                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                                >
                                                    About
                                                </NavLink>
                                            </div>
                                            <StoryButton></StoryButton>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex items-center sm:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="sr-only">
                                                Open main menu
                                            </span>
                                            {open ? (
                                                <XIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <MenuIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="sm:hidden">
                                <div className="pt-2 pb-3 space-y-1">
                                    {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                                    <NavLink
                                        exact
                                        to="/"
                                        activeClassName="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                        className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                    >
                                        Stories
                                    </NavLink>
                                    <NavLink
                                        to="/share-story"
                                        activeClassName="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                        className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                    >
                                        Share Your Story
                                    </NavLink>
                                    <NavLink
                                        to="/about"
                                        activeClassName="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                        className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                    >
                                        About
                                    </NavLink>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Switch>
                    <Route path="/share-story">
                        <ShareStory />
                    </Route>
                    <Route path="/story/:postId">
                        <Story />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
                <ModalContainer />
            </div>
        </Router>
    );
};

export default App;
