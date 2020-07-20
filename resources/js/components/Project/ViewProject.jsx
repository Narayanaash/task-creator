import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom"
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

class ViewProject extends Component {
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
            <div className="col-md-4 offset-md-4 mt-5 pt-5 dashboard-options">
                <h2>All Projects</h2>
                <ListGroup>
                {
                    this?.props?.projects?.map(project=>{
                        return (
                            <ListGroupItem>
                                <Link style={{fontSize:'24px',display:'block'}} to={`project-details/${project.id}`}>{project.name}</Link>
                                <span>{project.client.name}</span>
                                <span className="ml-4">{project.user.name}</span>
                            </ListGroupItem>
                        )
                    })
                }
                </ListGroup>
            </div>
        );
    }
}

ViewProject.PropsTypes = {
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
    ViewProject
);
