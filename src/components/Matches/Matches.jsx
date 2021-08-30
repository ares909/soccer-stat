import React, { useEffect, useState } from "react";
import { NavLink, useHistory, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMatches, applyFilter } from "../../store/slices/matchesSlice";

import MatchList from "../UI/matchlist/MatchList.jsx";

function Matches() {
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
        if (competitionStatus === "idle") {
            dispatch(
                fetchMatches({ competitionId: params.competitionId, dateFrom: filter.dateFrom, dateTo: filter.dateTo }),
            );
        } else if (competitionStatus === "succeeded" && params.competitionId !== competition.id.toString()) {
            dispatch(
                fetchMatches({ competitionId: params.competitionId, dateFrom: filter.dateFrom, dateTo: filter.dateTo }),
            );
        }
    }, [dispatch, competitionStatus, params.competitionId]);

    function filterMatches(e) {
        e.preventDefault();
        dispatch(
            fetchMatches({ competitionId: params.competitionId, dateFrom: filter.dateFrom, dateTo: filter.dateTo }),
        );
        history.push(`/competitions/${params.competitionId}/matches/${filter.dateFrom}/${filter.dateTo}`);
        setLimit(10);
    }

    return (
        <MatchList
            matches={matches}
            competition={competition}
            filter={filter}
            setFilter={setFilter}
            filterMatches={filterMatches}
            limit={limit}
            setLimit={setLimit}
            competitionStatus={competitionStatus}
            error={error}
        />
    );
}

export default Matches;
