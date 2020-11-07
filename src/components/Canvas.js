import React, { Component } from 'react';

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stageWidth: window.innerWidth,
			stageHeight: window.innerHeight,
		}
		this.canvasRef = React.createRef();
		this.ctx = null;
		window.addEventListener('resize', this.handleResize.bind(this), false);
	}
	handleResize = () => {
		if (this._ismount)
			this.setState({stageWidth: window.innerWidth, stageHeight: window.innerHeight});
	}
	draw = () => {
		this.ctx.beginPath();
		this.ctx.fillStyle = '#81d8e6';
		this.ctx.fillRect(0, 0, this.state.stageWidth, this.state.stageHeight);
		this.ctx.closePath();
	}
	componentDidMount() {
		this.ctx = this.canvasRef.current.getContext('2d');
		this.draw();
	}
	componentDidUpdate() {
		this.draw();
	}
	render() {
		return (
			<div>
				<canvas
				ref={this.canvasRef}
				width={this.state.stageWidth}
				height={this.state.stageHeight}
				onClick={this.props.toggle}
				/>
			</div>
		);
	}
}

// const Canvas = () => {
// 	const handleClick = (e) => {
// 		console.log(e.clientX);
// 		console.log(e.clientY);
// 	}
// 	const handleResize = () => {
// 		setWidth(window.innerWidth);
// 		setHeight(window.innerHeight);
// 	}
// 	// useState() 사용하기 위해 function components로 변경함.
// 	const [stageWidth, setWidth] = React.useState(window.innerWidth);
// 	const [stageHeight, setHeight] = React.useState(window.innerHeight);
// 	const canvasRef = React.createRef();
// 	const canvas = canvasRef.current;
// 	const ctx = canvas.getContext('2d');
// 	window.addEventListener('resize', handleResize, false);
// 	return (
// 		<div>
// 			<canvas
// 			ref={canvasRef}
// 			width={stageWidth}
// 			height={stageHeight}
// 			onClick={handleClick}
// 			/>
// 		</div>
// 	);
// }

export default Canvas;


// import React, { useState } from 'react';

// function Canvas() {
// 	const handleClick = (e) => {
// 		console.log(e.clientX);
// 		console.log(e.clientY);
// 	}
// 	const handleResize = () => {
// 		setWidth(window.innerWidth);
// 		setHeight(window.innerHeight);
// 	}
// 	// useState() 사용하기 위해 function components로 변경함.
// 	const [stageWidth, setWidth] = React.useState(window.innerWidth);
// 	const [stageHeight, setHeight] = React.useState(window.innerHeight);
// 	const canvasRef = React.createRef();
// 	const canvas = canvasRef.current;
// 	const ctx = canvas.getContext('2d');
// 	window.addEventListener('resize', handleResize, false);
// 	return (
// 		<div>
// 			<canvas
// 			ref={canvasRef}
// 			width={stageWidth}
// 			height={stageHeight}
// 			onClick={handleClick}
// 			/>
// 		</div>
// 	);
// }

// export default Canvas;
