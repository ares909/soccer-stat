import React from "react";

function Button(props) {
    return (
        <button
            {...props}
            disabled={!props.isValid}
            className={`search-bar__button ${!props.isValid ? "search-bar__button_disabled" : ""}`}
        >
            Найти
        </button>
    );
}

export default Button;
