import React, { Component } from 'react';

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
		this.ctx = null;
		this.startX = 0;
		this.startY = 0;
		// this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
	}
	draw = () => {
		this.ctx.beginPath();
		// this.ctx.fillStyle = '#81d8e6';
		this.ctx.fillStyle = 'rgb(184, 213, 255)';
		this.ctx.fillRect(0, 0, this.props.width, this.props.height);
		this.ctx.closePath();

		this.ctx.beginPath();
		this.ctx.strokeStyle = '#ffffff';
		for (let i = 0 ; i < this.props.tacks.length ; i++) {
			if (i === 0) {
				this.startX = this.props.tacks[0].offsetLeft+10;
				this.startY = this.props.tacks[0].offsetTop-55;
			} else {
				this.ctx.moveTo(this.startX, this.startY);
				this.ctx.lineTo(this.props.tacks[i].offsetLeft+10, this.props.tacks[i].offsetTop-55);
				this.ctx.stroke();
				this.startX = this.props.tacks[i].offsetLeft+10;
				this.startY = this.props.tacks[i].offsetTop-55;
			}
		}
	}
	componentDidMount() {
		this.ctx = this.canvasRef.current.getContext('2d');
		// this.ctx.scale(this.pixelRatio, this.pixelRatio);
		this.draw();
	}
	componentDidUpdate() {
		this.draw();
	}
	create = (e) => {
		console.log(e.pageX, e.pageY);
		const btn = document.createElement('button');
		document.getElementById('my_canvas').appendChild(btn);

		btn.style.position = 'absolute';
		// btn.style.position = 'relative';
		btn.style.width = "20px";
		btn.style.height = "11px";
		btn.style.top = e.pageY - 10 + 'px';
		btn.style.left = e.pageX - 10 + 'px';
		// btn.style.top = (e.clientY / window.innerHeight) * 100 + '%';
		// btn.style.left = (e.clientX / window.innerWidth) * 100 + '%';
		// btn.style.offsetTop = e.clientY;
		// btn.style.offsetLeft = e.clientX;
		// btn.style.backgroundColor = '#0a4180';
		btn.style.backgroundColor = "Transparent";
		btn.style.color = 'white';
		btn.style.borderRadius = "80%";

		// btn.style.fontFamily = 'Courier New';
		btn.style.fontFamily = 'Courier New';
		// btn.style.fontFamily = 'monospace';
		btn.innerText = `(${e.pageX},${e.pageY})`;
		btn.onclick = this.props.open;
		this.props.tacks.push(btn);
		this.draw();
	}
	render() {
		return (
			<div id="my_canvas">
				{/* <canvas style={{position: "relative"}} */}
				<canvas style={{height: "calc(100vh-60px"}}
				ref={this.canvasRef}
				width={this.props.width}
				height={this.props.height}
				onClick={this.create}
				/>
			</div>
		);
	}
}

export default Canvas;
