import React from "react";
import { NavLink } from "react-router-dom";

function Comptetition({ competition }) {
    return (
        <NavLink className="complist__link" to={`/competitions/${competition.id}`}>
            <li className="complist__item">
                <img
                    className="complist__item-image"
                    src={`${process.env.REACT_APP_PUBLIC_URL}/images/${competition.id}.png`}
                    alt="item"
                />

                <p className="complist__item-name">{competition.name}</p>
                <p className="complist__item-country">{competition.area.name}</p>
            </li>
        </NavLink>
    );
}

export default Comptetition;
