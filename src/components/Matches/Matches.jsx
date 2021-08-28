import React, { useEffect, useState } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMatches, applyFilter } from "../../store/slices/matchesSlice";
import DatePicker from "../UI/DatePicker/DatePicker.jsx";
import Header from "../Header/Header.jsx";
import Tablemobile from "../UI/table/Tablemobile.jsx";

function Matches({ match }) {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };
    const { competitionId } = match.params;
    const dispatch = useDispatch();
    const matches = useSelector((state) => state.matches.matches);
    const competition = useSelector((state) => state.matches.competition);
    const competitionStatus = useSelector((state) => state.matches.status);
    const error = useSelector((state) => state.matches.error);
    const [filter, setFilter] = useState({ dateFrom: "", dateTo: "" });

    useEffect(() => {
        dispatch(fetchMatches({ competitionId, dateFrom: filter.dateFrom, dateTo: filter.dateTo }));
    }, [dispatch, competitionId]);

    function filterMatches(e) {
        e.preventDefault();
        dispatch(fetchMatches({ competitionId, dateFrom: filter.dateFrom, dateTo: filter.dateTo }));
    }

    function formatDate(date) {
        const format = new Date(Date.parse(date)).toISOString().slice(0, 10);
        return format;
    }

    return (
        <section>
            <Header competition={competition} competitionId={competitionId}></Header>
            <div className="table__container">
                <DatePicker filter={filter} setFilter={setFilter} filterMatches={filterMatches}></DatePicker>
            </div>

            <table className="table table_disabled">
                <thead className="table__head">
                    <tr className="table__label">
                        <th>Дата</th>
                        <th>Дом</th>
                        <th></th>
                        <th>Гости</th>

                        <th>Статус</th>
                        <th>Счет</th>
                        {/* <th>Lost</th>
                        <th>Played games</th>
                        <th>Points</th> */}
                    </tr>
                </thead>
                <tbody className="table__body">
                    {matches.map((onematch) => (
                        <tr key={onematch.id}>
                            <td className="table__text">{formatDate(onematch.utcDate)}</td>

                            <td className="table__text">{onematch.homeTeam.name}</td>
                            <td className="table__text">vs</td>
                            <td className="table__text">{onematch.awayTeam.name}</td>
                            <td className="table__text">{onematch.status}</td>

                            {/* <td>{`${onematch.score.fulltime}`}</td> */}
                            <td className="table__text">{`${
                                onematch.score.fullTime.homeTeam === null ? "-" : onematch.score.fullTime.homeTeam
                            } : ${
                                onematch.score.fullTime.awayTeam === null ? "-" : onematch.score.fullTime.awayTeam
                            }`}</td>
                            {/* <td>{onematch.lost}</td>
                            <td>{onematch.playedGames}</td>
                            <td>{onematch.points}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="table-mobile__container">
                {matches.map((onematch) => (
                    <Tablemobile key={onematch.id} onematch={onematch} />
                ))}
            </div>
        </section>
    );
}

export default Matches;
