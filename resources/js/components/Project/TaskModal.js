import React, { Component } from "react";
import { connect } from "react-redux";
import PropsTypes from "prop-types";
import { getDevelopers } from "../../actions/developerActions";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Container
} from "reactstrap";

class TaskModal extends Component {
    state = {
        modal: false,
        name: "",
        detail: "",
        developer: "",
        status: ""
    };

    componentDidMount() {
        this.props.getDevelopers(this.props.id);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    inputHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        //close modal
        this.toggle();
    };

    render() {
        return (
            <div>
                <button
                    onClick={this.toggle}
                    className="btn btn-outline-primary"
                >
                    Create New Task
                </button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add New Task</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Task</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Create new task"
                                    onChange={this.inputHandler}
                                ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="detail">Detail</Label>
                                <Input
                                    type="textarea"
                                    name="detail"
                                    id="detail"
                                    placeholder="Task detail"
                                    onChange={this.inputHandler}
                                ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="developer">Developer</Label>
                                <select
                                    name="developer"
                                    id="developer"
                                    value={this.state.developer}
                                    onChange={this.inputHandler}
                                    className="form-control"
                                >
                                    <option value="" disabled>
                                        --select developer--
                                    </option>
                                    {this.props.developers.map(
                                        ({ id, name }) => (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <Label for="status">Status</Label>
                                <select
                                    name="status"
                                    id="status"
                                    value={this.state.status}
                                    onChange={this.inputHandler}
                                    className="form-control"
                                >
                                    <option value="" disabled>
                                        --select status--
                                    </option>
                                    <option value="to estimate">
                                        To Estimate
                                    </option>
                                    <option value="to Do">To Do</option>
                                    <option value="in progress">
                                        In Progress
                                    </option>
                                    <option value="testing">Testing</option>
                                    <option value="approval pending">
                                        Approval Pending
                                    </option>
                                    <option value="done">Done</option>
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    color="dark"
                                    style={{ marginTop: "2rem" }}
                                    block
                                >
                                    Add Task
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

TaskModal.PropsTypes = {
    isAuthenticated: PropsTypes.func.isRequired,
    getDevelopers: PropsTypes.func.isRequired
};

const mapStateToProps = state => ({
    developers: state.developer.developers
});

export default connect(mapStateToProps, { getDevelopers })(TaskModal);
