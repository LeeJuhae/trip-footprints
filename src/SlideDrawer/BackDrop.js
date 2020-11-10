import React from 'react';
import './BackDrop.css';

function BackDrop({close}) {
	return(
		<div className="backdrop" onClick={close} />
	);
}
export default BackDrop;
