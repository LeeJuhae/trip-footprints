import React, { Component } from 'react';
import './SlideDrawer.css';

class SlideDrawer extends Component {
	render() {
		let drawerClasses = this.props.isOpen ? 'side-drawer open' : 'side-drawer';
		return(
			<div className={drawerClasses}>
				<h1>Hello, I'm sliding!</h1>
			</div>
		);
	}
}
export default SlideDrawer;
