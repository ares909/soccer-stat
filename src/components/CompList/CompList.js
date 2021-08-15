import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Comptetition from "../Competition/Competition";
import { fetchCompetitions } from "../../store/slices/competitionsSlice";

function CompList() {
    const dispatch = useDispatch();
    const competitions = useSelector((state) => state.competitions.competitions);
    const competitionsStatus = useSelector((state) => state.competitions.status);
    const error = useSelector((state) => state.competitions.error);

    // console.log(competitions);

    useEffect(() => {
        if (competitionsStatus === "idle") {
            dispatch(fetchCompetitions());
        }
    }, [competitionsStatus, dispatch]);

    let content;

    if (competitionsStatus === "loading") {
        content = <div className="loader">Loading...</div>;
    } else if (competitionsStatus === "succeeded") {
        content = competitions.map((competition) => <Comptetition key={competition.id} competition={competition} />);
    } else if (competitionsStatus === "failed") {
        content = <div>{error}</div>;
    }

    return (
        <section className="complist">
            <ul className="complist__container">{content}</ul>
        </section>
    );
}

export default CompList;
