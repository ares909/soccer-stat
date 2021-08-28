import React from "react";

function Button(props) {
    return (
        <button
            {...props}
            className={`search-bar__button search-bar__add-button ${
                props.limit >= props.length ? "search-bar__add-button_disabled" : ""
            }`}
        >
            Еще
        </button>
    );
}

export default Button;
