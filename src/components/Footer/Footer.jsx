import React from "react";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__text">Dmitriy Khomyakov</p>
                <p className="footer__text">
                    Football data provided by the{" "}
                    <a className="footer__link" href="https://www.football-data.org/" target="_blank" rel="noreferrer">
                        Football-Data.org
                    </a>{" "}
                    API
                </p>
            </div>
        </footer>
    );
}

export default Footer;
