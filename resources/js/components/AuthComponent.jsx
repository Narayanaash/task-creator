import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import PropsTypes from "prop-types";

import Dashboard from "./Dashboard";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Container
} from "reactstrap";
import CreateProject from "./Project/CreateProject";

const AuthComponent = props => {
    const { isAuthenticated } = props.auth;

    useEffect(() => {
        requireAuth();
    }, [isAuthenticated]);

    function requireAuth() {
        if (!isAuthenticated) {
            props.history.push("/login");
        }
    }

    return (
        <>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/create-project" component={CreateProject} />
        </>
    );
};

AuthComponent.PropsTypes = {
    logout: PropsTypes.func.isRequired,
    auth: PropsTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default withRouter(connect(mapStateToProps, {})(AuthComponent));
