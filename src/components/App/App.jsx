import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CompList from "../CompList/CompList.jsx";
import Matches from "../Matches/Matches.jsx";
import Standings from "../Standings/Standings.jsx";
import TeamCalendar from "../TeamCalendar/TeamCalendar.jsx";
import TeamList from "../TeamList/TeamList.jsx";
import Footer from "../Footer/Footer.jsx";

function App() {
    const url = process.env.REACT_APP_PUBLIC_URL || "http://localhost:3000";
    return (
        <Router basename={url}>
            <div className="App">
                <Switch>
                    <Route exact path="/:filtered?" render={() => <CompList />} />
                    <Route exact path="/competitions/:competitionId/teams/:filtered?" component={TeamList} />
                    <Route exact path="/competitions/:competitionId/standings/" component={Standings} />
                    <Route exact path="/competitions/:competitionId/matches/:dateFrom?/:dateTo?" component={Matches} />
                    <Route exact path="/teams/:teamId/matches/:dateFrom?/:dateTo?" component={TeamCalendar} />
                </Switch>
            </div>
            <Footer></Footer>
        </Router>
    );
}

export default App;
