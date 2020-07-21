import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropsTypes from "prop-types";
import { getTasks } from "../../actions/taskActions";
import { getClients } from "../../actions/clientActions";
import TaskModal from "./TaskModal";

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

    componentDidMount() {
        this.props.getTasks(this.props.match.params.id);
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
                <h1>
                    Project :{" "}
                    {this.props.projects
                        .filter(
                            project => project.id == this.props.match.params.id
                        )
                        .map(project => {
                            return project.name;
                        })}
                </h1>
                <TaskModal />
                <h4 className="py-2">All Tasks</h4>
                <div className=" status-box">
                    <div className="status-box-head">To Estimate </div>
                    <div className="status-box-head">To Todo </div>
                    <div className="status-box-head">In Progress </div>
                    <div className="status-box-head">Testing </div>
                    <div className="status-box-head">Approval Pending</div>
                    <div className="status-box-head">Done</div>
                </div>
                <div className=" status-box">
                    <div className="status-box-item">
                        <ListGroup>
                            {this?.props?.tasks
                                ?.filter(task => task.status == "to estimate")
                                .map(task => {
                                    return (
                                        <ListGroupItem key={task.id}>
                                            {task.name}
                                        </ListGroupItem>
                                    );
                                })}
                        </ListGroup>
                    </div>
                    <div className="status-box-item">
                        <ListGroup>
                            {this?.props?.tasks
                                ?.filter(task => task.status == "to do")
                                .map(task => {
                                    return (
                                        <ListGroupItem key={task.id}>
                                            {task.name}
                                        </ListGroupItem>
                                    );
                                })}
                        </ListGroup>
                    </div>
                    <div className="status-box-item">
                        <ListGroup>
                            {this?.props?.tasks
                                ?.filter(task => task.status == "in progress")
                                .map(task => {
                                    return (
                                        <ListGroupItem key={task.id}>
                                            {task.name}
                                        </ListGroupItem>
                                    );
                                })}
                        </ListGroup>
                    </div>
                    <div className="status-box-item">
                        <ListGroup>
                            {this?.props?.tasks
                                ?.filter(task => task.status == "testing")
                                .map(task => {
                                    return (
                                        <ListGroupItem key={task.id}>
                                            {task.name}
                                        </ListGroupItem>
                                    );
                                })}
                        </ListGroup>
                    </div>
                    <div className="status-box-item">
                        <ListGroup>
                            {this?.props?.tasks
                                ?.filter(
                                    task => task.status == "approval pending"
                                )
                                .map(task => {
                                    return (
                                        <ListGroupItem key={task.id}>
                                            {task.name}
                                        </ListGroupItem>
                                    );
                                })}
                        </ListGroup>
                    </div>
                    <div className="status-box-item">
                        <ListGroup>
                            {this?.props?.tasks
                                ?.filter(task => task.status == "done")
                                .map(task => {
                                    return (
                                        <ListGroupItem key={task.id}>
                                            {task.name}
                                        </ListGroupItem>
                                    );
                                })}
                        </ListGroup>
                    </div>
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
    projects: PropsTypes.func.isRequired,
    getTasks: PropsTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    client: state.client,
    projects: state.project.projects,
    tasks: state.task.tasks
});

export default connect(mapStateToProps, { getClients, getTasks })(
    ProjectDetails
);
