import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../images/logo_cl.png";
import { fetchCompetitions, selectAllComps, selectCompById, selectCompIds } from "../../store/slices/competitionsSlice";

function Comptetition({ competitionId }) {
    const competition = useSelector((state) => selectCompById(state, competitionId));
    return (
        <NavLink to={`/competitions/${competitionId}`}>
            <li className="complist__item">
                <img className="complist__item-image" src={logo} alt="item" />
                <p className="complist__item-name">{competition.name}</p>
                <p className="complist__item-country">{competition.area.name}</p>
            </li>
        </NavLink>
    );
}

export default Comptetition;
