import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar({ competitionId, dateFrom, dateTo }) {
    return (
        <nav className="navbar">
            <Link className="navbar__link" to="/">
                Главная
            </Link>

            <NavLink
                activeStyle={{
                    fontWeight: "bold",
                    color: "#7df9ff",
                    borderBottom: "thick solid",
                }}
                className="navbar__link"
                to={`/competitions/${competitionId}/teams/`}
            >
                Команды
            </NavLink>
            <NavLink
                activeStyle={{
                    fontWeight: "bold",
                    color: "#7df9ff",
                    borderBottom: "thick solid",
                }}
                className="navbar__link"
                exact
                to={`/competitions/${competitionId}/standings/`}
            >
                Таблица
            </NavLink>
            <NavLink
                activeStyle={{
                    fontWeight: "bold",
                    color: "#7df9ff",
                    borderBottom: "thick solid",
                }}
                className="navbar__link"
                to={
                    `/competitions/${competitionId}/matches/` ||
                    `/competitions/${competitionId}/matches/${dateFrom}/${dateTo}`
                }
            >
                Матчи
            </NavLink>
        </nav>
    );
}

export default Navbar;
