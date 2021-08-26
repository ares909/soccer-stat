import React, { useEffect } from "react";
import { NavLink, useHistory, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompetition } from "../../store/slices/singleCompetitionSlice";

function SingleCompetition({ match }) {
    const competitionStatus = useSelector((state) => state.competition.status);
    const competition = useSelector((state) => state.competition.competition);

    const error = useSelector((state) => state.competitions.error);
    // // const goPrevPage = useSelector(goPrevPage);
    const { competitionId } = match.params;
    // const competition = useSelector((state) => selectCompById(state, competitionId));

    const dispatch = useDispatch();

    const history = useHistory();
    useEffect(() => {
        dispatch(fetchCompetition(competitionId));
    }, [dispatch]);

    const goBack = () => {
        history.goBack();
        // dispatch(goPrevPage());
    };

    let info;

    if (competitionStatus === "loading") {
        info = <div className="loader">Loading...</div>;
    } else if (competitionStatus === "succeeded") {
        info = (
            <div>
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
                    <NavLink exact to={`/competitions/${competitionId}/teams`}>
                        Teams
                    </NavLink>
                    <NavLink exact to={`/competitions/${competitionId}/standings`}>
                        Standings
                    </NavLink>
                    <NavLink exact to={`/competitions/${competitionId}/matches`}>
                        Matches
                    </NavLink>
                    <NavLink exact to={`/competitions/${competitionId}/scorers`}>
                        Scorers
                    </NavLink>
                </nav>
                {info}
            </div>
        </section>
    );
}

export default SingleCompetition;
