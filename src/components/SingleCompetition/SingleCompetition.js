import React, { useEffect } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompetition } from "../../store/slices/singleCompetitionSlice";

function SingleCompetition({ match }) {
    const competitionStatus = useSelector((state) => state.competition.status);
    const { competitionId } = match.params;
    const dispatch = useDispatch();
    // useEffect(() => {
    //     if (competitionStatus === "idle") {
    //         dispatch(fetchCompetition(competitionId));
    //     }
    // }, [competitionStatus, dispatch, competitionId]);

    useEffect(() => {
        dispatch(fetchCompetition(competitionId));
    }, [dispatch, competitionId]);

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    const competition = useSelector((state) => state.competition.competition);

    const error = useSelector((state) => state.competitions.error);

    let info;

    if (competitionStatus === "loading") {
        info = <div className="loader">Loading...</div>;
    } else if (competitionStatus === "succeeded") {
        info = (
            <div>
                {" "}
                <p>Competition info</p>
                <p>Location: {competition.area.name}</p>
                <p>Start-date: {competition.currentSeason.startDate}</p>
                <p>End-date: {competition.currentSeason.endDate}</p>
            </div>
        );
    } else if (competitionStatus === "failed") {
        info = <div>{error}</div>;
    }

    return (
        <section className="single-competition">
            <div className="single-competition__container">
                <img src={competition.emblemUrl} />
                <h1 className="single-competition__title">{competition.name}</h1>
                <nav className="single-competition__navigation">
                    <Link onClick={goBack}>Back to main</Link>
                    <NavLink exact to={`/competitions/${competition.id}/teams`}>
                        Teams
                    </NavLink>
                    <NavLink exact to={`/competitions/${competition.id}/standings`}>
                        Standings
                    </NavLink>
                    <NavLink exact to={`/competitions/${competition.id}/matches`}>
                        Matches
                    </NavLink>
                    <NavLink exact to={`/competitions/${competition.id}/scorers`}>
                        Scorers
                    </NavLink>
                </nav>
            </div>
            {info}
        </section>
    );
}

export default SingleCompetition;
