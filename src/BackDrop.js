import React from 'react';
import './styles/BackDrop.css';

function BackDrop({close}) {
	return(
		<div>
			<div className="backdrop" onClick={close} />
		</div>
	);
}
export default BackDrop;
