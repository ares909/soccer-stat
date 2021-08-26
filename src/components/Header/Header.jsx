import React from "react";
import { NavLink, useHistory, Link, useLocation } from "react-router-dom";

function Header() {
    const history = useHistory();
    return (
        <header className="header">
            <div className="header__container">
                <Link className="header__link" onClick={() => history.push("/")}>
                    <img
                        className="header__logo"
                        src={`${process.env.REACT_APP_PUBLIC_URL}/images/logo.svg`}
                        alt="logo"
                    />
                </Link>
                <h1 className="header__title">SoccerStat</h1>
            </div>
        </header>
    );
}

export default Header;
