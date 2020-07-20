import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropsTypes from "prop-types";
import {getProjects } from "../actions/projectActions";


import { ListGroup, ListGroupItem, Badge } from "reactstrap";

class Dashboard extends Component {
    componentDidMount(){
        this.props.getProjects()
    }
    render() {
        return (
            <div className="col-md-4 offset-md-4 mt-5 pt-5 dashboard-options">
                <ListGroup>
                    <ListGroupItem
                        tag={Link}
                        to="/create-project"
                        className="justify-content-between"
                    >
                        <i className="fa fa-edit"></i> Create a Project
                    </ListGroupItem>
                    <ListGroupItem
                        tag={Link}
                        to="/view-projects"
                        className="justify-content-between"
                    >
                        <i className="fa fa-eye"></i> View Projects{" "}
                        <Badge pill>{this?.props?.projects?.length}</Badge>
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    projects: state.project.projects
});

export default withRouter(connect(mapStateToProps, {getProjects})(Dashboard));