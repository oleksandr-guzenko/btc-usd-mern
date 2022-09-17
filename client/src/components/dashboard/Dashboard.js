import React, { Component } from "react";
import { connect } from "react-redux";

import { doGuessing, getRecords } from '../../actions/guessActions';
import Table from '../table/Table';
import socket from '../../socket';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			btc_usd: 0
		};

		socket.on('connect', () => {
			console.log('Connected to server');
		});

		socket.on('updateBTC_USD', data => this.setState({btc_usd: data}));
	}

	componentDidMount() {
		this.props.getRecords();
	}

	changeBTC = (e) => {
		if(e.target.value >= 0) this.setState({[e.target.name]: e.target.value});
	};

	guess = (e, mode) => {
		if(!this.props.auth.user.active) {
			this.props.doGuessing(mode, this.state.btc_usd);
		}
	}

    render() {
		const { records, recordsLoading } = this.props.guess;
		const { btc_usd } = this.state;

		let score = 0;

		if(records.length === 0) score = 0;
		else records.map(value => value.guessResult ? score ++ : score --);

        return (
            <div className="container">
				<div className="col-12 col-md-9 mx-auto">
					<h1 className='text-info'>BTC To USD</h1>
					<h2>{new Intl.NumberFormat().format(btc_usd)} <small className="text-muted" style={{fontSize: '24px'}}>USD</small></h2>
					<p>This data is updated every second.</p>
					<hr />
					<div>
						<h1 className="text-center mb-3">Guess</h1>
						<div className="text-center">
							<button className="btn btn-success ml-2" onClick={e => this.guess(e, 'up')}>
								Up <span className="fa fa-arrow-up"></span>
							</button>
							<button className="btn btn-danger ml-2 d-inline-block" onClick={e => this.guess(e, 'down')}>
								Down <span className="fa fa-arrow-down"></span>
							</button>
						</div>
						<div className="p-4" id="accordion">
							<div className="clearfix">
								<div className="float-right"><a className='text-info' href='#help' data-toggle="collapse"><span className="fa fa-question-circle-o"></span> How to guess</a></div>
							</div>
							<div className="bg-light rounded-lg pr-3 pl-3 collapse" id="help" data-parent="#accordion">
								<div style={{height: '1rem'}}></div>
								<ul>
									<li>The player can choose to enter a guess of either “Up or Same” or “Down“</li>
									<li>After a guess is entered the player cannot make new guesses until the existing guess is resolved</li>
									<li>The guess is resolved when the price changes and at least 60 seconds have passed since the guess was made</li>
									<li>If the guess is correct (up = price went higher, down = price went lower), the user gets 1 point added to their score. If
										the guess is incorrect, the user loses 1 point.
									</li>
								</ul>
								<div style={{height: '1rem'}}></div>
							</div>
						</div>
					</div>
					{ recordsLoading && <p className="text-center"><span className="spinner-border p-4"></span></p>}
					{ !recordsLoading && (
						<>
							<h4 className="text-center">Score: { score }</h4>
							<div className="border-bottom mb-2">
								<div className="col-4 mx-auto bg-light border-secondary border rounded-lg text-center"><span className="fa fa-line-chart"></span> Statistics</div>
							</div>
							<Table items={records}/>
						</>
					)}
				</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
	guess: state.guess
});

export default connect(
    mapStateToProps,
    {
		doGuessing,
		getRecords
	}
)(Dashboard);
