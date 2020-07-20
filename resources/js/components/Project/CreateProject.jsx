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
    CardText
} from "reactstrap";

class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            client_id: "",
            msg: null
        };
    }

    componentDidMount() {
        this.props.getClients();
    }

    UNSAFE_componentWillMount() {
        //If authenticated
        if (!this.props.isAuthenticated) {
            this.props.history.push("/login");
        }
    }

    componentDidUpdate() {
        //If authenticated
        if (!this.props.isAuthenticated) {
            this.props.history.push("/login");
        }
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
                <Card>
                    <CardHeader tag="h3">Create new project</CardHeader>
                    <CardBody>
                        <Form onSubmit={this.onSubmit} className="form">
                            <Col>
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input
                                        type="name"
                                        name="name"
                                        id="name"
                                        value={this.state.name}
                                        onChange={this.inputHandler}
                                        placeholder="project title"
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Client</Label>
                                    <select
                                        name="client"
                                        id="client"
                                        value={this.state.client_id}
                                        onChange={this.inputHandler}
                                        className="form-control"
                                    >
                                        <option value="" disabled>
                                            --select client--
                                        </option>
                                        {clients.map(({ id, name }) => (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    {this.props.isLoading ? (
                                        <Button disabled className="mt-4 w-100">
                                            <Spinner
                                                size="sm"
                                                color="primary"
                                            />{" "}
                                        </Button>
                                    ) : (
                                        <Button className="mt-4 w-100">
                                            Submit
                                        </Button>
                                    )}
                                </FormGroup>
                            </Col>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

CreateProject.PropsTypes = {
    isAuthenticated: PropsTypes.func.isRequired,
    getClients: PropsTypes.bool,
    error: PropsTypes.object.isRequired,
    client: PropsTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    client: state.client
});

export default connect(mapStateToProps, { getClients, addProject })(
    CreateProject
);
