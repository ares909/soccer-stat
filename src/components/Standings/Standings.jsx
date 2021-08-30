import React, { useEffect } from "react";
import { NavLink, useHistory, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSchedule } from "../../store/slices/standingsSlice";
import Header from "../Header/Header.jsx";

function Standings({ match }) {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };
    const { competitionId } = useParams();
    const dispatch = useDispatch();
    const standings = useSelector((state) => state.standings.standings);
    const competition = useSelector((state) => state.standings.competition);
    const competitionStatus = useSelector((state) => state.standings.status);
    const error = useSelector((state) => state.standings.error);

    useEffect(() => {
        if (competitionStatus === "idle") {
            dispatch(getSchedule(competitionId));
        } else if (competitionStatus === "succeeded" && competitionId !== competition.id.toString()) {
            dispatch(getSchedule(competitionId));
        }
    }, [dispatch, competitionStatus, competitionId]);

    return (
        <section className="table">
            <Header competition={competition} competitionId={competitionId}></Header>
            <table className="table__section">
                <thead className="table__head">
                    <tr className="table__label">
                        <th>№</th>
                        <th>Команда</th>
                        <th>М</th>
                        <th>В</th>
                        <th>Н</th>
                        <th>П</th>
                        <th>О</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    {standings.map((team) => (
                        <tr key={team.team.id}>
                            <td className="table__text">{team.position}</td>
                            <td className="table__team">
                                {" "}
                                <Link className="table__link" exact to={`/teams/${team.team.id}/matches/`}>
                                    <img className="table__image" src={team.team.crestUrl} />
                                </Link>
                                <Link className="table__link" exact to={`/teams/${team.team.id}/matches/`}>
                                    {team.team.name}
                                </Link>
                            </td>
                            <td className="table__text">{team.playedGames}</td>
                            <td className="table__text">{team.won}</td>
                            <td className="table__text">{team.draw}</td>
                            <td className="table__text">{team.lost}</td>
                            <td className="table__text">{team.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Standings;
