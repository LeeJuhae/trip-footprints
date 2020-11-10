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
		this.ctx.fillStyle = '#81d8e6';
		this.ctx.fillRect(0, 0, this.props.width, this.props.height);
		this.ctx.closePath();

		this.ctx.beginPath();
		this.ctx.strokeStyle = '#ffffff';
		for (let i = 0 ; i < this.props.tacks.length ; i++) {
			if (i === 0) {
				this.startX = this.props.tacks[0].offsetLeft;
				this.startY = this.props.tacks[0].offsetTop;
			} else {
				this.ctx.moveTo(this.startX, this.startY);
				this.ctx.lineTo(this.props.tacks[i].offsetLeft, this.props.tacks[i].offsetTop);
				this.ctx.stroke();
				this.startX = this.props.tacks[i].offsetLeft;
				this.startY = this.props.tacks[i].offsetTop;
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
		const btn = document.createElement('button');
		document.getElementById('my_canvas').appendChild(btn);

		btn.style.position = 'absolute';
		btn.style.top = (e.clientY / window.innerHeight) * 100 + '%';
		btn.style.left = (e.clientX / window.innerWidth) * 100 + '%';
		btn.style.backgroundColor = '#0a4180';
		btn.style.color = 'white';
		btn.innerHTML = 'TPRI';
		btn.onclick = this.props.open;
		this.props.tacks.push(btn);
		this.draw();
	}
	render() {
		return (
			<div id="my_canvas">
				<canvas
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
