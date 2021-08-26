import React from "react";

function Button(props) {
    return (
        <button {...props} className="search-bar__button">
            Найти
        </button>
    );
}

export default Button;
