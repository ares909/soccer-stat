import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Comptetition from "../Competition/Competition";
import { fetchCompetitions, selectAllComps, selectCompById, selectCompIds } from "../../store/slices/competitionsSlice";
import SearchBar from "../SearchBar/SearchBar.jsx";

function CompList() {
    const dispatch = useDispatch();
    const competitions = useSelector(selectCompIds);
    const competitionsStatus = useSelector((state) => state.competitions.status);
    const error = useSelector((state) => state.competitions.error);
    const [filter, setFilter] = useState();
    const [filteredData, setFilteredData] = useState();

    // console.log(competitions);

    useEffect(() => {
        if (competitionsStatus === "idle") {
            dispatch(fetchCompetitions());
        }
    }, [competitionsStatus, dispatch]);

    const getFilteredList = (e) => {
        e.preventDefault();
        const filtered = competitions.filter((competition) =>
            competition.name.toLowerCase().includes(filter.toLowerCase()),
        );
        setFilteredData(filtered);
    };

    const filteredList = () => {
        if (filteredData) {
            return filteredData;
        }
        return competitions;
    };

    let content;

    if (competitionsStatus === "loading") {
        content = <div className="loader">Loading...</div>;
    } else if (competitionsStatus === "succeeded") {
        const filteredCompetitions = filteredList();
        content = filteredCompetitions.map((competitionId) => (
            <Comptetition key={competitionId} competitionId={competitionId} />
        ));
    } else if (competitionsStatus === "failed") {
        content = <div>{error}</div>;
    }

    return (
        <section className="complist">
            <SearchBar filter={filter} setFilter={setFilter} getFilteredList={getFilteredList}></SearchBar>
            <ul className="complist__container">{content}</ul>
        </section>
    );
}

export default CompList;
