import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleTeam } from "../../store/slices/singleTeamSlice";
import MatchList from "../UI/matchlist/MatchList.jsx";

function TeamCalendar() {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const matches = useSelector((state) => state.team.calendar);
    const error = useSelector((state) => state.team.error);
    const competitionStatus = useSelector((state) => state.team.status);
    const [filter, setFilter] = useState({ dateFrom: params.dateFrom || "", dateTo: params.dateTo || "" });
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        dispatch(fetchSingleTeam({ teamId: params.teamId, dateFrom: filter.dateFrom, dateTo: filter.dateTo }));
    }, [dispatch]);

    function filterMatches(e) {
        e.preventDefault();
        dispatch(fetchSingleTeam({ teamId: params.teamId, dateFrom: filter.dateFrom, dateTo: filter.dateTo }));
        history.push(`/teams/${params.teamId}/matches/${filter.dateFrom}/${filter.dateTo}`);
    }

    return (
        <MatchList
            matches={matches}
            filter={filter}
            setFilter={setFilter}
            filterMatches={filterMatches}
            limit={limit}
            setLimit={setLimit}
            error={error}
            teamId={params.teamId}
            competitionStatus={competitionStatus}
        />
    );
}
export default TeamCalendar;
