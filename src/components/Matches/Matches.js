import React, { useEffect } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMatches } from "../../store/slices/matchesSlice";

function Matches({ match }) {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };
    const { competitionId } = match.params;
    const dispatch = useDispatch();
    const matches = useSelector((state) => state.matches.matches);
    const competitionStatus = useSelector((state) => state.matches.status);
    const error = useSelector((state) => state.matches.error);

    useEffect(() => {
        if (competitionStatus === "idle") {
            dispatch(fetchMatches(competitionId));
        }
    }, [competitionStatus, dispatch]);

    return (
        <section>
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

export default Matches;
