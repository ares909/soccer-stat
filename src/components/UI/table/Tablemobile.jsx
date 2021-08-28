import React, { useEffect, useState } from "react";

function Tablemobile({ onematch }) {
    function formatDate(date) {
        const format = new Date(Date.parse(date)).toLocaleString().slice(0, 10);
        return format;
    }

    return (
        <div className="table-mobile">
            <p className="table-mobile__text">{formatDate(onematch.utcDate)}</p>
            <div className="table-mobile__match">
                <p className="table-mobile__text table-mobile__match_team"> {onematch.homeTeam.name}</p>
                <p className="table-mobile__text table-mobile__match_result">{`${
                    onematch.score.fullTime.homeTeam === null ? "-" : onematch.score.fullTime.homeTeam
                } : ${onematch.score.fullTime.awayTeam === null ? "-" : onematch.score.fullTime.awayTeam}`}</p>
                <p className="table-mobile__text table-mobile__match_team">{onematch.awayTeam.name}</p>
            </div>
            <p className="table-mobile__text">{onematch.status}</p>
        </div>
    );
}

export default Tablemobile;
