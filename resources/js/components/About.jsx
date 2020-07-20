import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropsTypes from "prop-types";

import {
    Container,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
    Alert
} from "reactstrap";

class About extends Component {
    render() {
        return "This is About";
    }
}

export default About;
