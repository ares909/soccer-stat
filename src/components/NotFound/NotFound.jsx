import React from "react";
import { useHistory } from "react-router-dom";

function NotFound() {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    return (
        <section className="not-found">
            <div className="not-found__container">
                <h2 className="not-found__title">404</h2>
                <p className="not-found__text">Страница не найдена</p>
                <div onClick={goBack} className="not-found__link">
                    Назад
                </div>
            </div>
        </section>
    );
}
export default NotFound;
