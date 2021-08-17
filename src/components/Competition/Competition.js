import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo_cl.png";

function Comptetition({ competition }) {
    return (
        <NavLink to={`/competitions/${competition.id}`}>
            <li className="complist__item">
                <img className="complist__item-image" src={logo} alt="item" />
                <p className="complist__item-name">{competition.name}</p>
                <p className="complist__item-country">{competition.area.name}</p>
            </li>
        </NavLink>
    );
}

export default Comptetition;
