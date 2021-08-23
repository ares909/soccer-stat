import React from "react";

function DateInput(props) {
    return <input {...props} type="date" className="input" pattern="\d{4}-\d{2}-\d{2}"></input>;
}

export default DateInput;
