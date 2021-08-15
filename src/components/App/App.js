import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CompList from "../CompList/CompList";
import SingleCompetition from "../SingleCompetition/SingleCompetition";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" render={() => <CompList />} />
                    <Route exact path="/competition/:id" component={SingleCompetition} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
