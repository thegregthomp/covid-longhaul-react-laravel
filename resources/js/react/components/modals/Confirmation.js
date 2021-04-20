import React from "react";
import PropTypes from "prop-types";
import { ModalWrapper, Reoverlay } from "reoverlay";
import "reoverlay/lib/ModalWrapper.css";
import { CheckIcon } from "@heroicons/react/outline";

const Confirmation = props => {
    const closeModal = () => {
        Reoverlay.hideModal();
    };
    return (
        <ModalWrapper>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <CheckIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Your story posted!
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Please be patient as all stories go through review before they're posted live in the stories section.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-6">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                        onClick={closeModal}
                    >
                        Read Stories
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default Confirmation;
