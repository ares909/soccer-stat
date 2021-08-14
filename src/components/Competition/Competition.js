import React from "react";
import logo from "../../images/logo_cl.png";

function Comptetition() {
    return (
        <li className="complist__item">
            <img className="complist__item-image" src={logo} alt="item" />
            <p className="complist__item-name">Название</p>
            <p className="complist__item-country">Страна</p>
        </li>
    );
}

export default Comptetition;
