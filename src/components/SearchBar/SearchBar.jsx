import React from "react";
import Input from "../UI/input/Input.jsx";
import Button from "../UI/button/Button.jsx";

function SearchBar({ filter, setFilter, getFilteredList }) {
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
