import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo_cl.png";

function Comptetition({ competition }) {
    return (
        <Link to={`/competitions/${competition.id}`}>
            <li className="complist__item">
                <img className="complist__item-image" src={logo} alt="item" />
                <p className="complist__item-name">{competition.name}</p>
                <p className="complist__item-country">{competition.area.name}</p>
            </li>
        </Link>
    );
}

export default Comptetition;
