import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    Alert,
    Spinner,
    CardText
} from "reactstrap";

import { connect } from "react-redux";
import { register } from "../actions/authActions";
import PropsTypes from "prop-types";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            role: "",
            password: "",
            msg: null
        };
    }

    UNSAFE_componentWillMount() {
        //If authenticated
        if (this.props.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //check for register error
            if (error.id === "REGISTER_FAIL") {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        //If authenticated
        if (isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    inputHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role,
            password: this.state.password
        };

        //Add user via register action
        this.props.register(newUser);

        //clear form
        this.setState({
            name: "",
            email: "",
            role: "",
            password: ""
        });
    };

    render() {
        return (
            <Container className="Signup">
                <div className="col-md-4 offset-md-4 mt-5">
                    {!this.props.isLoading ? (
                        this.props.registered ? (
                            <Alert color="success">
                                {this.props.registered}
                                <Link to="/login"> Login here</Link>
                            </Alert>
                        ) : null
                    ) : null}
                    {!this.props.isLoading ? (
                        this.state.msg ? (
                            <Alert color="danger">{this.state.msg}</Alert>
                        ) : null
                    ) : null}
                    <Card>
                        <CardHeader tag="h3">Signup</CardHeader>
                        <CardBody>
                            <Form onSubmit={this.onSubmit} className="form">
                                <Col>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input
                                            type="name"
                                            name="name"
                                            id="name"
                                            value={this.state.name}
                                            onChange={this.inputHandler}
                                            placeholder="your name"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input
                                            type="text"
                                            name="email"
                                            id="email"
                                            value={this.state.email}
                                            onChange={this.inputHandler}
                                            placeholder="myemail@email.com"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>Role</Label>
                                        <select
                                            name="role"
                                            id="role"
                                            value={this.state.role}
                                            onChange={this.inputHandler}
                                            className="form-control"
                                        >
                                            <option value="" disabled>
                                                --select your role--
                                            </option>
                                            <option value="Manager">
                                                Manager
                                            </option>
                                            <option value="Developer">
                                                Developer
                                            </option>
                                            <option value="Client">
                                                Client
                                            </option>
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={this.state.password}
                                            onChange={this.inputHandler}
                                            placeholder="********"
                                            autoComplete="new-password"
                                        />

                                        {this.props.isLoading ? (
                                            <Button
                                                disabled
                                                className="mt-4 w-100"
                                            >
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
                            <CardText className="text-center">
                                <small className="text-muted">
                                    Already have an account ?{" "}
                                    <Link to="/login">Login here</Link>
                                </small>
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            </Container>
        );
    }
}

Signup.PropsTypes = {
    register: PropsTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    registered: state.auth.msg,
    isLoading: state.auth.isLoading,
    error: state.error
});

export default connect(mapStateToProps, { register })(Signup);
