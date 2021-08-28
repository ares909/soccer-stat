import React from "react";
import { NavLink, useHistory, Link, useLocation } from "react-router-dom";

function Navbar({ competitionId }) {
    const history = useHistory();
    // const goBack = () => {
    //     history.goBack();
    //     // dispatch(goPrevPage());
    // };
    return (
        <nav className="navbar">
            <Link className="navbar__link" onClick={() => history.push("/")}>
                Главная
            </Link>

            <NavLink
                activeStyle={{
                    fontWeight: "bold",
                    color: "#7df9ff",
                    borderBottom: "thick solid",
                }}
                className="navbar__link"
                exact
                to={`/competitions/${competitionId}/teams`}
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
                to={`/competitions/${competitionId}/standings`}
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
                exact
                to={`/competitions/${competitionId}/matches`}
            >
                Матчи
            </NavLink>
        </nav>
    );
}

export default Navbar;
