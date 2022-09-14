import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
	render() {
		return (
			<div style={{ height: "75vh" }} className='container mt-5 pt-5'>
        <div className="col-8 mx-auto">
          <h1 className="text-center">Welcome to our website.</h1>
          <img src="/images/background.png" alt="background.png" width='100%' className="mt-5 mb-5" />
          <hr />
            <div className="text-center">
              <Link className="m-1 p-2" style={{minWidth: '120px'}} to='/login'><span className="fa fa-sign-in"></span> Login</Link>
              <Link className="btn btn-primary m-1 p-2" style={{minWidth: '120px', borderRadius: '21px'}} to='/register'>Register <span className="fa fa-user-plus"></span></Link>
            </div>
          </div>
        </div>
		);
	}
}

export default Landing;
