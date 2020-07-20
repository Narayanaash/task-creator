import React, { Component } from "react";
import { connect } from "react-redux";
import PropsTypes from "prop-types";
import { addProject } from "../../actions/projectActions";
import { getClients } from "../../actions/clientActions";

import {
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    CardHeader,
    Alert,
    Spinner,
    CardText,
    ListGroup,
    ListGroupItem
} from "reactstrap";

class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            client_id: "",
            msg: null
        };
    }




    inputHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        console.log(this.state);
        e.preventDefault();

        const newProject = {
            name: this.state.name,
            client_id: this.state.client_id
        };

        //Add project via addProject action
        this.props.addProject(newProject);
    };

    render() {
        const { clients } = this.props.client;
        return (
            <div className="details">
                <h1>Project : Some Project</h1>
                <button className="btn btn-outline-primary">
                    Create New Task
                </button>
                <h4>All Tasks</h4>
                <div className=" status-box">
                    <div className="status-box-head">In Design </div>
                    <div className="status-box-head">In Todo </div>
                    <div className="status-box-head">In Progress </div>
                    <div className="status-box-head">In Development </div>
                    <div className="status-box-head">Development Done</div>
                </div>
                <div className=" status-box">
                    <div className="status-box-item"></div>
                    <div className="status-box-item"></div>
                    <div className="status-box-item"></div>
                    <div className="status-box-item"></div>
                    <div className="status-box-item"></div>
                </div>
            </div>
        );
    }
}

ProjectDetails.PropsTypes = {
    isAuthenticated: PropsTypes.func.isRequired,
    getClients: PropsTypes.bool,
    error: PropsTypes.object.isRequired,
    client: PropsTypes.func.isRequired,
    projects:PropsTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    client: state.client,
    projects: state.project.projects
});

export default connect(mapStateToProps, { getClients, addProject })(
    ProjectDetails
);
