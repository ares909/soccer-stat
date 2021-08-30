import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Comptetition from "../Competition/Competition.jsx";
import { fetchCompetitions, selectAllComps, selectCompById, selectCompIds } from "../../store/slices/competitionsSlice";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Header from "../Header/Header.jsx";
import Error from "../UI/error/Error.jsx";
import errorMessages from "../UI/error/errorMessages";

function CompList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { filtered } = useParams();
    const competitions = useSelector((state) => state.competitions.competitions);
    const competitionsStatus = useSelector((state) => state.competitions.status);
    const error = useSelector((state) => state.competitions.error);
    const [filter, setFilter] = useState(filtered || "");
    const [filteredData, setFilteredData] = useState("");

    useEffect(() => {
        if (competitionsStatus === "idle") {
            dispatch(fetchCompetitions());
        }
    }, [competitionsStatus, dispatch]);

    useEffect(() => {
        if (filtered !== "" || filtered !== undefined) {
            const filteredList = competitions.filter((competition) =>
                competition.name.toLowerCase().includes(filter.toLowerCase()),
            );
            setFilteredData(filteredList);
        }
    }, [competitionsStatus]);

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

    let content;

    if (competitionsStatus === "loading") {
        content = <div className="loader">Загрузка...</div>;
    } else if (competitionsStatus === "succeeded") {
        const filteredCompetitions = filteredList();
        content =
            filteredCompetitions.length !== 0 ? (
                filteredCompetitions.map((competition) => (
                    <Comptetition key={competition.id} competition={competition} />
                ))
            ) : (
                <Error message={errorMessages.emptyList} />
            );
    } else if (competitionsStatus === "failed" || competitions === undefined) {
        content = <Error message={errorMessages.noResponse} />;
    }

    return (
        <section className="complist">
            <Header></Header>
            <div className="complist__title-bar">
                {" "}
                <h1 className="complist__title">Список соревнований</h1>{" "}
                <SearchBar filter={filter} setFilter={setFilter} getFilteredList={getFilteredList}></SearchBar>
            </div>

            <ul className="complist__container">{content}</ul>
        </section>
    );
}

export default CompList;
