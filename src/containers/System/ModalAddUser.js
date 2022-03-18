import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './ModalAddUser.scss'
class ModalAddUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowPassword: false,
            email: '',
            password: '',
            fullName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            roleId: '',
        }
    }

    componentDidMount() {
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    toggle = () => {
        this.props.toggleUserModal()
    }

    handleOnChangeInput = (event) => {
        console.log(event.target.value);
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="lg"
                className={'modal-add-user'}
            >
                <ModalHeader toggle={() => this.toggle()} >
                    Create new user
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row ml-2 mr-2 ">
                            <form action="/postSignUp" method="POST">
                                <div className="form-row">

                                    <div className="form-group col-6">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            onChange={(e) => this.handleOnChangeInput(e)}
                                        />
                                    </div>
                                    <div className="form-group col-6 show-hide-password">
                                        <label htmlFor="password">Password</label>
                                        <input type={this.state.isShowPassword ? 'text' : 'password'} className="form-control" name="password" />
                                        <span className="icon-show-hide-password"
                                            onClick={() => this.handleShowHidePassword()}
                                        >
                                            <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <label htmlFor="fullName">Full Name</label>
                                        <input type="text" className="form-control" name="fullName" />
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <input type="text" className="form-control" name="phoneNumber" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" name="address" placeholder="..., Da Nang" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <label htmlFor="gender">Gender</label>
                                        <select name="gender" className="form-control">
                                            <option value="1">Male</option>
                                            <option value="0">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="roleId">Role</label>
                                        <select name="roleId" className="form-control">
                                            <option value="1">Admin</option>
                                            <option value="0">Doctor</option>
                                            <option value="2">Patient</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => this.toggle()}
                        className="btn-add"
                    >
                        Add New User
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddUser);
