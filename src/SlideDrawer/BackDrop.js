import React, { Component } from 'react';
import './BackDrop.css';

class BackDrop extends Component {
	render() {
		return(
			<div className="backdrop"
				onClick={this.props.close}
			/>
		);
	}
}
export default BackDrop;
