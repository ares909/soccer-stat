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

    return (
        <section className="complist">
            <ul className="complist__container">
                {competitionsStatus === "loading" ? (
                    <div>Loading...</div>
                ) : competitionsStatus === "error" ? (
                    <div>{error}</div>
                ) : (
                    competitions.map((competition) => <Comptetition key={competition.id} competition={competition} />)
                )}
            </ul>
        </section>
    );
}

export default CompList;
