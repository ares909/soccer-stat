import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../content/Content.jsx";
import DatePicker from "../date-picker/DatePicker.jsx";
import Header from "../../Header/Header.jsx";
import Tablemobile from "../table/Tablemobile.jsx";
import AddButton from "../button/AddButton.jsx";

function MatchList({
    filterMatches,
    competition,
    matches,
    filter,
    setFilter,
    limit,
    setLimit,
    teamId,
    competitionStatus,
    error,
}) {
    const params = useParams();

    const [isValid, setValid] = useState(false);

    useEffect(() => {
        if (filter.dateFrom !== "" && filter.dateTo !== "" && filter.dateFrom <= filter.dateTo) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [filter]);

    function formatDate(date) {
        const format = new Date(Date.parse(date)).toLocaleString().slice(0, 10);
        return format;
    }

    function addLimit(num) {
        setLimit(num + 10);
    }

    return (
        <section className="table">
            <Header
                competition={competition}
                competitionId={params.competitionId}
                teamId={params.teamId}
                dateFrom={filter.dateFrom}
                dateTo={filter.dateTo}
            ></Header>
            <div className="table__container">
                <DatePicker
                    filter={filter}
                    setFilter={setFilter}
                    filterMatches={filterMatches}
                    isValid={isValid}
                ></DatePicker>
            </div>
            <Content competitionStatus={competitionStatus} data={matches} error={error}>
                <table className="table__section table__section_disabled">
                    <thead className="table__head">
                        <tr className="table__label">
                            <th>Дата</th>
                            <th>Дом</th>
                            <th></th>
                            <th>Гости</th>

                            <th>Статус</th>
                            <th>Счет</th>
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        {matches
                            ? matches.slice(0, limit).map((onematch) => (
                                  <tr key={onematch.id}>
                                      <td className="table__text">{formatDate(onematch.utcDate)}</td>

                                      <td
                                          className={`table__text ${
                                              teamId === onematch.homeTeam.id.toString() ? "table__text_chosen" : ""
                                          }`}
                                      >
                                          {onematch.homeTeam.name}
                                      </td>
                                      <td className="table__text">vs</td>
                                      <td
                                          className={`table__text ${
                                              teamId === onematch.awayTeam.id.toString() ? "table__text_chosen" : ""
                                          }`}
                                      >
                                          {onematch.awayTeam.name}
                                      </td>
                                      <td className="table__text">{onematch.status}</td>

                                      <td className="table__text">{`${
                                          onematch.score.fullTime.homeTeam === null
                                              ? "-"
                                              : onematch.score.fullTime.homeTeam
                                      } : ${
                                          onematch.score.fullTime.awayTeam === null
                                              ? "-"
                                              : onematch.score.fullTime.awayTeam
                                      }`}</td>
                                  </tr>
                              ))
                            : error}
                    </tbody>
                </table>
                <div className="table-mobile__container">
                    {matches
                        ? matches
                              .slice(0, limit)
                              .map((onematch) => <Tablemobile key={onematch.id} onematch={onematch} teamId={teamId} />)
                        : error}
                </div>
            </Content>

            <AddButton
                limit={limit}
                length={matches.length}
                onClick={() => {
                    addLimit(limit);
                }}
            ></AddButton>
        </section>
    );
}

export default MatchList;
