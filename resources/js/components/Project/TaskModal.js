import React, { Component } from "react";
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
        name: ""
    };

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
                                <Label for="item">Task</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Create new task"
                                    onChange={this.inputHandler}
                                ></Input>
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

export default TaskModal;
