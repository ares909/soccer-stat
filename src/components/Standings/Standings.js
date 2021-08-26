import React, { useEffect } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSchedule } from "../../store/slices/standingsSlice";

function Standings({ match }) {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };
    const { competitionId } = match.params;
    const dispatch = useDispatch();
    const standings = useSelector((state) => state.standings.standings);
    const competitionStatus = useSelector((state) => state.standings.status);
    const error = useSelector((state) => state.standings.error);

    useEffect(() => {
        dispatch(getSchedule(competitionId));
    }, [dispatch]);

    return (
        <section>
            <table className="table table-striped" data-testid="leaderboard-table">
                <thead>
                    <tr key="head">
                        <th>Position</th>
                        <th>Name</th>
                        <th>Won</th>
                        <th>Draw</th>
                        <th>Lost</th>
                        <th>Played games</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.map((team) => (
                        <tr key={team.team.id}>
                            <td>{team.position}</td>
                            <td>{team.team.name}</td>
                            <td>{team.won}</td>
                            <td>{team.draw}</td>
                            <td>{team.lost}</td>
                            <td>{team.playedGames}</td>
                            <td>{team.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Standings;
