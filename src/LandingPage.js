import React from 'react';
import logo from './resource/logo.svg';
import './styles/LandingPage.css';

function LandingPage() {
	return(
		<div id="wrap-landingpage">
			<span>
				{/* <iframe loops="true" width="560" height="315" src="https://www.youtube.com/embed/DUytBqlyCro?controls=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
				{/* <video controls autoPlay src="../resource/tpri2.mp4"></video> */}
				<img src={logo} id="logo" alt="logo"/>
			</span>
			<div id="slogan">
				<div>Your fooTPRInts</div>
				<div>on TPRI</div>
			</div>
		</div>
	);
}

export default LandingPage;
