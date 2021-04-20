import React from 'react'
import PropTypes from 'prop-types'

const Loading = (props) => {
    return (
        <div className="flex mt-4 md:mt-8 items-center justify-center">
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading
