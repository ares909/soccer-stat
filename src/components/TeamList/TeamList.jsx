import React, { useEffect, useState } from "react";
import { NavLink, useHistory, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeams } from "../../store/slices/teamsSlice";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Header from "../Header/Header.jsx";

function TeamList() {
    const { competitionId, filtered } = useParams();
    const dispatch = useDispatch();
    const teams = useSelector((state) => state.teams.teams);
    const competition = useSelector((state) => state.teams.competition);
    const competitionStatus = useSelector((state) => state.teams.status);
    const error = useSelector((state) => state.teams.error);
    const [filter, setFilter] = useState(filtered || "");
    const [filteredData, setFilteredData] = useState();

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    useEffect(() => {
        if (competitionStatus === "idle") {
            dispatch(fetchTeams(competitionId));
        } else if (competitionStatus === "succeeded" && competitionId !== competition.id.toString()) {
            dispatch(fetchTeams(competitionId));
        }
    }, [dispatch, competitionStatus, competitionId]);

    useEffect(() => {
        if (filtered !== "" || filtered !== undefined) {
            const filteredList = teams.filter((team) => team.name.toLowerCase().includes(filter.toLowerCase()));
            setFilteredData(filteredList);
        }
    }, [competitionStatus, competitionId]);

    const getFilteredList = (e) => {
        e.preventDefault();
        const filteredList = teams.filter((team) => team.name.toLowerCase().includes(filter.toLowerCase()));
        setFilteredData(filteredList);
        history.push(`/competitions/${competitionId}/teams/${filter}`);
    };

    const filteredList = () => {
        if (filteredData) {
            return filteredData;
        }
        return teams;
    };

    return (
        <section>
            <Header competition={competition} competitionId={competitionId}></Header>

            <div className="table__container">
                <SearchBar filter={filter} setFilter={setFilter} getFilteredList={getFilteredList}></SearchBar>
            </div>

            <table className="table__section">
                <thead className="table__head">
                    <tr className="table__label">
                        <th>Команда</th>
                        <th>Тег</th>
                        <th>Основан</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    {filteredList().map((team) => (
                        <tr className="table__item" key={team.id}>
                            <td className="table__team">
                                <Link className="table__link" exact to={`/teams/${team.id}/matches/`}>
                                    <img className="table__image" src={team.crestUrl} />
                                </Link>
                                <Link className="table__link" exact to={`/teams/${team.id}/matches/`}>
                                    {team.name}
                                </Link>
                            </td>
                            <td className="table__text">{team.tla}</td>
                            <td className="table__text">{team.founded}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default TeamList;
