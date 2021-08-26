import React, { useEffect, useState } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleTeam } from "../../store/slices/singleTeamSlice";
import DatePicker from "../UI/DatePicker/DatePicker.jsx";

function TeamCalendar({ match }) {
    const { teamId } = match.params;
    const dispatch = useDispatch();
    const matches = useSelector((state) => state.team.calendar);
    const [filter, setFilter] = useState({ dateFrom: "", dateTo: "" });
    const [filteredData, setFilteredData] = useState();

    useEffect(() => {
        dispatch(fetchSingleTeam({ teamId, dateFrom: filter.dateFrom, dateTo: filter.dateTo }));
        console.log(matches);
    }, [dispatch]);

    function filterMatches(e) {
        e.preventDefault();
        dispatch(fetchSingleTeam({ teamId, dateFrom: filter.dateFrom, dateTo: filter.dateTo }));
    }
    return (
        <section>
            <DatePicker filter={filter} setFilter={setFilter} filterMatches={filterMatches}></DatePicker>
            <table className="table table-striped" data-testid="leaderboard-table">
                <thead>
                    <tr key="head">
                        <th>Date</th>
                        <th>HomeTeam</th>
                        <th>AwayTeam</th>

                        <th>Status</th>
                        <th>Score</th>
                        {/* <th>Lost</th>
                        <th>Played games</th>
                        <th>Points</th> */}
                    </tr>
                </thead>
                <tbody>
                    {matches.map((onematch) => (
                        <tr key={onematch.id}>
                            <td>{onematch.utcDate}</td>

                            <td>{onematch.homeTeam.name}</td>
                            <td>{onematch.awayTeam.name}</td>
                            <td>{onematch.status}</td>
                            {/* <td>{`${onematch.score.fulltime}`}</td> */}
                            <td>{`${onematch.score.fullTime.homeTeam} : ${onematch.score.fullTime.awayTeam}`}</td>
                            {/* <td>{onematch.lost}</td>
                            <td>{onematch.playedGames}</td>
                            <td>{onematch.points}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
export default TeamCalendar;
