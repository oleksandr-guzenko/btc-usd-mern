import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="col-8 mx-auto pt-5">
          <div className="clearfix mt-5">
            <div className="float-right">
            <Link to="/" className="btn btn-outline-secondary">
                <span className="fa fa-reply"></span>
              </Link>
            </div>
          </div>
          <h1 className="text-center">Login</h1>
          <p className="text-muted">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email <span className="text-danger">*</span></label>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("form-control", {
                  'border-danger': errors.email || errors.emailnotfound
                })}
              />
              
              <p className="text-danger">
              {errors.email} {errors.emailnotfound}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password <span className="text-danger">*</span></label>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("form-control", {
                  'border-danger': errors.password || errors.passwordincorrect
                })}
              />
              <span className="text-danger">
                {errors.password} {errors.passwordincorrect}
              </span>
            </div>
            <button type="submit" className="btn btn-block btn-primary"><span className="fa fa-sign-in"></span> Login</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
