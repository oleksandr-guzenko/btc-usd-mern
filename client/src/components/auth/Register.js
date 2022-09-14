import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
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
              <h1 className="text-center">Register</h1>
              <p className="text-muted">Already have an account? <Link to="/login">Log in</Link></p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name <span className="text-danger">*</span></label>
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className={classnames("form-control", {
                      'border-danger': errors.name
                    })}
                  />
                  <span className="text-danger">{errors.name}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email <span className="text-danger">*</span></label>
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("form-control", {
                      'border-danger': errors.email
                    })}
                  />
                  <span className="text-danger">{errors.email}</span>
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
                      'border-danger': errors.password
                    })}
                  />
                  <span className="text-danger">{errors.password}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="password2">Confirm Password <span className="text-danger">*</span></label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("form-control", {
                      'border-danger': errors.password2
                    })}
                  />
                  <span className="text-danger">{errors.password2}</span>
                </div>
                <button type="submit" className="btn btn-block btn-success"><span className="fa fa-user-plus"></span> Sign Up</button>
              </form>
            </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
