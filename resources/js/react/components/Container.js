import React from "react";
import PropTypes from "prop-types";

const Container = ({ children }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">{children}</div>
        </div>
    );
};

export default Container;
