import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Navbar from "../UI/navbar/Navbar.jsx";

function Header({ competition, competitionId, teamId, dateFrom, dateTo }) {
    const history = useHistory();
    const location = useLocation();
    const goBack = () => {
        history.goBack();
    };
    const url = process.env.REACT_APP_PUBLIC_URL || "http://localhost:3000";

    return (
        <header className="header">
            <div className={`header__container ${location.pathname === "/" ? "" : "header__container_disabled"}`}>
                <div className="header__link" onClick={() => history.push("/")}>
                    <img className="header__logo" src={`${url}/images/logo.svg`} alt="logo" />
                </div>
                <h1 className="header__title">{competition ? competition.name : "SoccerStat"}</h1>
            </div>
            {competition ? <Navbar competitionId={competitionId} dateFrom={dateFrom} dateTo={dateTo}></Navbar> : ""}
            {location.pathname.includes(`/teams/${teamId}/matches/`) ? (
                <div className="header__link navbar__link" onClick={() => goBack()}>
                    Назад
                </div>
            ) : (
                ""
            )}
        </header>
    );
}

export default Header;
