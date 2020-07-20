import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
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
    Alert,
    Spinner
} from "reactstrap";

class Login extends Component {
    state = {
        email: "",
        password: "",
        msg: ""
    };

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
            if (error.id === "LOGIN_FAIL") {
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

        const { email, password } = this.state;

        const user = {
            email,
            password
        };

        // Attempt to login
        this.props.login(user);
    };
    render() {
        return (
            <Container className="Login">
                <div className="col-md-4 offset-md-4 mt-5 pt-5">
                    {this.state.msg ? (
                        <Alert color="danger">{this.state.msg}</Alert>
                    ) : null}
                    <Card>
                        <CardHeader tag="h3">Login</CardHeader>
                        <CardBody>
                            <Form onSubmit={this.onSubmit} className="form">
                                <Col>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={this.state.email}
                                            onChange={this.inputHandler}
                                            placeholder="myemail@email.com"
                                            autoComplete="email"
                                        />
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
                                            autoComplete="current-password"
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
                                    Don't have an account ?{" "}
                                    <Link to="/signup">Signup here</Link>
                                </small>
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            </Container>
        );
    }
}

Login.PropsTypes = {
    isAuthenticated: PropsTypes.bool,
    error: PropsTypes.object.isRequired,
    login: PropsTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    error: state.error
});

export default connect(mapStateToProps, { login })(Login);
