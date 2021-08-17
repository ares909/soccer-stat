import React, { useEffect } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeams } from "../../store/slices/teamsSlice";

function TeamList({ match }) {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };
    const { competitionId } = match.params;
    const dispatch = useDispatch();
    const teams = useSelector((state) => state.teams.teams);
    const competitionStatus = useSelector((state) => state.teams.status);
    const error = useSelector((state) => state.teams.error);

    useEffect(() => {
        if (competitionStatus === "idle") {
            dispatch(fetchTeams(competitionId));
        }
    }, [competitionStatus, dispatch]);

    return (
        <section>
            <table className="table table-striped" data-testid="leaderboard-table">
                <thead>
                    <tr key="head">
                        <th>Name</th>
                        <th>Short</th>
                        <th>Founded</th>
                        <th>Venue</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
                        <tr key={team.id}>
                            <td>{team.name}</td>
                            <td>{team.tla}</td>
                            <td>{team.founded}</td>
                            <td>{team.venue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default TeamList;
