import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CompList from "../CompList/CompList";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" render={() => <CompList />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
