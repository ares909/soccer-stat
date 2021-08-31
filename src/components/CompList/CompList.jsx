import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Comptetition from "../Competition/Competition.jsx";
import { fetchCompetitions } from "../../store/slices/competitionsSlice";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Header from "../Header/Header.jsx";

import Content from "../UI/content/Content.jsx";

function CompList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { filtered } = useParams();
    const competitions = useSelector((state) => state.competitions.competitions);
    const competitionStatus = useSelector((state) => state.competitions.status);
    const error = useSelector((state) => state.competitions.error);
    const [filter, setFilter] = useState(filtered || "");
    const [filteredData, setFilteredData] = useState("");

    useEffect(() => {
        if (competitionStatus === "idle") {
            dispatch(fetchCompetitions());
        }
    }, [competitionStatus, dispatch]);

    useEffect(() => {
        if (filtered !== "" || filtered !== undefined) {
            const filteredList = competitions.filter((competition) =>
                competition.name.toLowerCase().includes(filter.toLowerCase()),
            );
            setFilteredData(filteredList);
        }
    }, [competitionStatus]);

    const getFilteredList = (e) => {
        e.preventDefault();
        const filteredList = competitions.filter((competition) =>
            competition.name.toLowerCase().includes(filter.toLowerCase()),
        );
        setFilteredData(filteredList);
        history.push(`/${filter}`);
    };

    const filteredList = () => {
        if (filteredData) {
            return filteredData;
        }
        return competitions;
    };

    return (
        <section className="complist">
            <Header></Header>
            <div className="complist__title-bar">
                {" "}
                <SearchBar filter={filter} setFilter={setFilter} getFilteredList={getFilteredList}></SearchBar>
            </div>
            <Content competitionStatus={competitionStatus} data={filteredList()} error={error}>
                <ul className="complist__container">
                    {filteredList().map((competition) => (
                        <Comptetition key={competition.id} competition={competition} />
                    ))}
                </ul>
            </Content>
        </section>
    );
}

export default CompList;
