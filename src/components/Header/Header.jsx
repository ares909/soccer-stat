import React from "react";
import { NavLink, useHistory, Link, useLocation } from "react-router-dom";
import Navbar from "../UI/navbar/Navbar.jsx";

function Header({ competition, competitionId, teamId }) {
    const history = useHistory();
    const location = useLocation();
    const goBack = () => {
        history.goBack();
    };

    return (
        <header className="header">
            <div className={`header__container ${location.pathname === "/" ? "" : "header__container_disabled"}`}>
                <Link className="header__link" onClick={() => history.push("/")}>
                    <img
                        className="header__logo"
                        src={`${process.env.REACT_APP_PUBLIC_URL}/images/logo.svg`}
                        alt="logo"
                    />
                </Link>
                <h1 className="header__title">{competition ? competition.name : "SoccerStat"}</h1>
            </div>
            {competition ? <Navbar competitionId={competitionId}></Navbar> : ""}
            {location.pathname === `/teams/${teamId}/matches` ? (
                <Link className="header__link navbar__link" onClick={() => goBack()}>
                    Назад
                </Link>
            ) : (
                ""
            )}
        </header>
    );
}

export default Header;
