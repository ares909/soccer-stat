import React from "react";
import Error from "../error/Error.jsx";
import errorMessages from "../error/errorMessages";

function Content({ competitionStatus, data, children, error, competition }) {
    let content;

    if (competitionStatus === "loading") {
        content = <div className="content__loader">Загрузка...</div>;
    } else if (error) {
        content = <Error message={error || errorMessages.noResponse} />;
    } else if (competitionStatus === "succeeded" && data.length !== 0) {
        content = children;
    } else if (competitionStatus === "succeeded" && data.length === 0) {
        content = <Error message={errorMessages.emptyList} />;
    } else {
        content = <Error message={errorMessages.emptyList} />;
    }

    return <div className="content"> {content} </div>;
}

export default Content;
