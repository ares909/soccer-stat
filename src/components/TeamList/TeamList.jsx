import React, { useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeams } from "../../store/slices/teamsSlice";
import SearchBar from "../UI/searchbar/SearchBar.jsx";
import Header from "../Header/Header.jsx";
import Content from "../UI/content/Content.jsx";

function TeamList() {
    const { competitionId, filtered } = useParams();
    const dispatch = useDispatch();
    const teams = useSelector((state) => state.teams.teams);
    const competition = useSelector((state) => state.teams.competition);
    const teamStatus = useSelector((state) => state.teams.status);
    const error = useSelector((state) => state.teams.error);
    const [filter, setFilter] = useState(filtered || "");
    const [filteredData, setFilteredData] = useState();

    const history = useHistory();

    useEffect(() => {
        if (teamStatus === "idle") {
            dispatch(fetchTeams(competitionId));
        } else if (!error && teamStatus === "succeeded" && competitionId !== competition.id.toString()) {
            dispatch(fetchTeams(competitionId));
        }
    }, [dispatch, teamStatus, competitionId]);

    useEffect(() => {
        if (filtered !== "" && filtered !== undefined) {
            const filteredList = teams.filter((team) => team.name.toLowerCase().includes(filter.toLowerCase()));
            setFilteredData(filteredList);
        }
    }, [teamStatus, competitionId]);

    const getFilteredList = (e) => {
        e.preventDefault();
        const filteredList = teams.filter((team) => team.name.toLowerCase().includes(filter.toLowerCase()));
        setFilteredData(filteredList);
        history.push(`/competitions/${competitionId}/teams/${filter}`);
    };

    const filteredList = () => {
        let data;
        if (filteredData) {
            data = filteredData;
        } else if (teams !== undefined) {
            data = teams;
        } else {
            data = error;
        }
        return data;
    };

    return (
        <section className="table">
            <Header competition={competition} competitionId={competitionId}></Header>

            <div className="table__container">
                <SearchBar filter={filter} setFilter={setFilter} getFilteredList={getFilteredList}></SearchBar>
            </div>
            <Content competitionStatus={teamStatus} data={filteredList()} error={error} competition={competition}>
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
                                    <Link className="table__link" to={`/teams/${team.id}/matches/`}>
                                        <img className="table__image" src={team.crestUrl} />
                                    </Link>
                                    <Link className="table__link" to={`/teams/${team.id}/matches/`}>
                                        {team.name}
                                    </Link>
                                </td>
                                <td className="table__text">{team.tla}</td>
                                <td className="table__text">{team.founded}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Content>
        </section>
    );
}

export default TeamList;
