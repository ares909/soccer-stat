import React from "react";

function DateInput(props) {
    return <input className="date-picker__input" {...props} type="date" pattern="\d{4}-\d{2}-\d{2}"></input>;
}

export default DateInput;
