import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { FormattedMessage } from 'react-intl';

import * as actions from "../../store/actions";
// import { userLoginSuccess } from "../../store/actions"
import './Login.scss';
import { handleLoginAPI } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
            errCode: '',
        }
    }

    handleOnchangeUsername = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            const data = await handleLoginAPI(this.state.email, this.state.password)
            console.log(data);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {

                this.props.userLoginSuccess(data.user)

                console.log(data.errCode, data.message);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className="main">
                {/* <form action="" method="POST" className="form" id="form-1"> */}
                <div className="form">
                    <h3 className="heading">Login</h3>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Username</label>
                        <input
                            value={this.state.username}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="VD: email@domain.com"
                            className="form-control"
                            onChange={(event) => this.handleOnchangeUsername(event)}
                        />
                    </div>

                    <div className="form-group ">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="show-hide-password">
                            <input
                                value={this.state.password}
                                id="password"
                                name="password"
                                type={this.state.isShowPassword ? 'text' : 'password'}
                                placeholder="Enter Password"
                                className="form-control"
                                onChange={(event) => this.handleOnchangePassword(event)}
                            />
                            <span className="icon-show-hide-password"
                                onClick={() => this.handleShowHidePassword()}
                            >
                                <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                            </span>

                        </div>
                        <span className="form-message">{this.state.errMessage}</span>

                    </div>

                    <button className="form-submit"
                        onClick={() => this.handleLogin()}
                    >
                        Login
                    </button>

                    <div className="form-group forgot">
                        <a><span>Forgot your password?</span></a>
                    </div>
                    {/* </form> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
