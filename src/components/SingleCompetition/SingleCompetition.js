import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompetition } from "../../store/slices/singleCompetition";

function SingleCompetition({ match }) {
    const dispatch = useDispatch();
    const competition = useSelector((state) => state.competition.competition);
    const competitionsStatus = useSelector((state) => state.competitions.status);
    const error = useSelector((state) => state.competitions.error);
    const { competitionId } = match.params;
    useEffect(() => {
        dispatch(fetchCompetition(competitionId));
    }, [competitionsStatus, dispatch]);
    return <section>{competition.name}</section>;
}

export default SingleCompetition;
