import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import PropsTypes from "prop-types";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Container
} from "reactstrap";

const Header = props => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const { isAuthenticated, user } = props.auth;

    const authLinks = (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                <span className="text-capitalize">
                    {user ? `Welcome ${user.name}` : ""}
                </span>
                <i className="fa fa-user ml-2"></i>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem tag={Link} to="/dashboard">
                    Dashboard <i className="fa fa-dashboard"></i>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={props.logout}>
                    Logout <i className="fa fa-sign-out"></i>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );

    const guestLinks = (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                <i className="fa fa-user"></i>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem tag={Link} to="/login">
                    Login
                </DropdownItem>
                <DropdownItem tag={Link} to="/signup">
                    Signup
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <Container>
                    <NavbarBrand href="/">TaskCreator</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/">
                                    Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/about">
                                    About
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

Header.PropsTypes = {
    logout: PropsTypes.func.isRequired,
    auth: PropsTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
