import React, { useEffect, useState } from "react";
import { NavLink, useHistory, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMatches, applyFilter } from "../../store/slices/matchesSlice";
import DatePicker from "../UI/DatePicker/DatePicker.jsx";
import Header from "../Header/Header.jsx";
import Tablemobile from "../UI/table/Tablemobile.jsx";
import AddButton from "../UI/button/AddButton.jsx";

function Matches({ match }) {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };
    const params = useParams();
    const dispatch = useDispatch();
    const matches = useSelector((state) => state.matches.matches);
    const competition = useSelector((state) => state.matches.competition);
    const competitionStatus = useSelector((state) => state.matches.status);
    const error = useSelector((state) => state.matches.error);
    const [filter, setFilter] = useState({ dateFrom: params.dateFrom || "", dateTo: params.dateTo || "" });
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        dispatch(
            fetchMatches({ competitionId: params.competitionId, dateFrom: filter.dateFrom, dateTo: filter.dateTo }),
        );
    }, [dispatch]);

    function filterMatches(e) {
        e.preventDefault();
        dispatch(
            fetchMatches({ competitionId: params.competitionId, dateFrom: filter.dateFrom, dateTo: filter.dateTo }),
            history.push(`/competitions/${params.competitionId}/matches/${filter.dateFrom}/${filter.dateTo}`),
        );
    }

    function formatDate(date) {
        const format = new Date(Date.parse(date)).toLocaleString().slice(0, 10);
        return format;
    }

    function addLimit(num) {
        setLimit(num + 10);
    }

    return (
        <section className="table">
            <Header
                competition={competition}
                competitionId={params.competitionId}
                dateFrom={filter.dateFrom}
                dateTo={filter.dateTo}
            ></Header>
            <div className="table__container">
                <DatePicker filter={filter} setFilter={setFilter} filterMatches={filterMatches}></DatePicker>
            </div>

            <table className="table__section table__section_disabled">
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
                    {matches.slice(0, limit).map((onematch) => (
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
                {matches.slice(0, limit).map((onematch) => (
                    <Tablemobile key={onematch.id} onematch={onematch} />
                ))}
            </div>
            <AddButton
                limit={limit}
                length={matches.length}
                onClick={() => {
                    addLimit(limit);
                }}
            ></AddButton>
        </section>
    );
}

export default Matches;