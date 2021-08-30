import React, { useState, useEffect } from "react";
import Input from "../UI/input/Input.jsx";
import Button from "../UI/button/Button.jsx";

function SearchBar({ filter, setFilter, getFilteredList }) {
    // const [isValid, setValid] = useState(false);

    // useEffect(() => {
    //     if (filter === "" || filter === undefined) {
    //         setValid(false);
    //     } else {
    //         setValid(true);
    //     }
    // }, [filter]);

    return (
        <form className="search-bar" onSubmit={getFilteredList}>
            {" "}
            <Input
                value={filter || ""}
                onChange={(e) => {
                    setFilter(e.target.value);
                }}
            />
            <Button isValid={true} />
        </form>
    );
}

export default SearchBar;
