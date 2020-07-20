import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/authActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Index.css";

import Header from "./Header";
import About from "./About";
import Login from "./Login";
import Signup from "./Signup";
import AuthComponents from "./AuthComponent";

function Index() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" />
                    <Route path="/about" component={About} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <AuthComponents />
                </Switch>
            </Router>
        </Provider>
    );
}

export default Index;

if (document.getElementById("app")) {
    ReactDOM.render(<Index />, document.getElementById("app"));
}
