import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService'
import ModalAddUser from './ModalAddUser';

class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        const response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    render() {
        return (
            <div className="container">
                <ModalAddUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                />
                <div className="row">
                    <div className="col-12 mt-5 mb-3 header-manage-user">
                        <b>Manage Users</b>
                    </div>
                    <div className="col-12 div-add-user">
                        <button
                            className="btn-add-user"
                            onClick={() => this.handleAddNewUser()}
                        >
                            <i className="fas fa-plus mx-1"></i>
                            Add new user
                        </button>
                    </div>
                    <table className=" col-12 ">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Gender</th>
                                <th>Actions</th>
                            </tr>
                            {this.state.arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            {item.gender == 1 ? 'Male' : 'Female'}
                                        </td>
                                        <td>
                                            <button className="action edit">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="action delete">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
