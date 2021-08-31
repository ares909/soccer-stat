import React from "react";

function Button(props) {
    const { isValid, ...rest } = props;
    return (
        <button
            {...rest}
            disabled={!props.isValid}
            className={`search-bar__button ${!props.isValid ? "search-bar__button_disabled" : ""}`}
        >
            Найти
        </button>
    );
}

export default Button;
