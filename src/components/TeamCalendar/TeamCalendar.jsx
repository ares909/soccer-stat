import React, { useEffect, useState } from "react";
import { NavLink, useHistory, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleTeam } from "../../store/slices/singleTeamSlice";
import DatePicker from "../UI/DatePicker/DatePicker.jsx";
import Header from "../Header/Header.jsx";
import Tablemobile from "../UI/table/Tablemobile.jsx";

function TeamCalendar({ match }) {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const matches = useSelector((state) => state.team.calendar);
    const [filter, setFilter] = useState({ dateFrom: params.dateFrom || "", dateTo: params.dateTo || "" });
    const [filteredData, setFilteredData] = useState();

    useEffect(() => {
        dispatch(fetchSingleTeam({ teamId: params.teamId, dateFrom: filter.dateFrom, dateTo: filter.dateTo }));
        console.log(matches);
    }, [dispatch]);

    function filterMatches(e) {
        e.preventDefault();
        dispatch(fetchSingleTeam({ teamId: params.teamId, dateFrom: filter.dateFrom, dateTo: filter.dateTo }));
        history.push(`/teams/${params.teamId}/matches/${filter.dateFrom}/${filter.dateTo}`);
    }
    function formatDate(date) {
        const format = new Date(Date.parse(date)).toLocaleString().slice(0, 10);
        return format;
    }

    return (
        <section>
            <Header teamId={params.teamId} />
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

                            <td
                                className={`table__text ${
                                    onematch.homeTeam.id === Number(params.teamId) ? "table__text_chosen" : ""
                                }`}
                            >
                                {onematch.homeTeam.name}
                            </td>
                            <td className="table__text">vs</td>
                            <td
                                className={`table__text ${
                                    onematch.awayTeam.id === Number(params.teamId) ? "table__text_chosen" : ""
                                }`}
                            >
                                {onematch.awayTeam.name}
                            </td>
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
export default TeamCalendar;
