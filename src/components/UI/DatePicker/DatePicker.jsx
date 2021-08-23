import React from "react";
import Button from "../button/Button.jsx";
import DateInput from "../date-input/DateInput.jsx";

function DatePicker({ filter, setFilter, filterMatches }) {
    const currentDate = new Date().toISOString().slice(0, 10);
    return (
        <form onSubmit={filterMatches}>
            <label>Date from</label>
            <DateInput
                value={filter.dateFrom}
                onChange={(e) => {
                    setFilter({ ...filter, dateFrom: e.target.value });
                }}
            />
            <label>Date to</label>
            <DateInput
                value={filter.dateTo}
                onChange={(e) => {
                    setFilter({ ...filter, dateTo: e.target.value });
                }}
            />
            <Button></Button>
        </form>
    );
}

export default DatePicker;
