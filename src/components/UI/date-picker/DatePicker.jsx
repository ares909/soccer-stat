import React from "react";
import Button from "../button/Button.jsx";
import DateInput from "../date-input/DateInput.jsx";

function DatePicker({ filter, setFilter, filterMatches, isValid }) {
    return (
        <form className="date-picker" onSubmit={filterMatches}>
            <label className="date-picker__label">От</label>
            <DateInput
                value={filter.dateFrom}
                onChange={(e) => {
                    setFilter({ ...filter, dateFrom: e.target.value });
                }}
            />
            <label className="date-picker__label">До</label>
            <DateInput
                value={filter.dateTo}
                onChange={(e) => {
                    setFilter({ ...filter, dateTo: e.target.value });
                }}
            />
            <Button isValid={isValid}></Button>
        </form>
    );
}

export default DatePicker;
