import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CompList from "../CompList/CompList.jsx";
import Matches from "../Matches/Matches.jsx";
import SingleCompetition from "../SingleCompetition/SingleCompetition";
import Standings from "../Standings/Standings.jsx";
import TeamCalendar from "../TeamCalendar/TeamCalendar.jsx";
import TeamList from "../TeamList/TeamList.jsx";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" render={() => <CompList />} />
                    {/* <Route exact path="/competitions/:competitionId" component={SingleCompetition} /> */}
                    <Route exact path="/competitions/:competitionId/teams" component={TeamList} />
                    <Route exact path="/competitions/:competitionId/standings" component={Standings} />
                    <Route exact path="/competitions/:competitionId/matches" component={Matches} />
                    <Route exact path="/teams/:teamId/matches" component={TeamCalendar} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
