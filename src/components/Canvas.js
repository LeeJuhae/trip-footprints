import React, { Component } from 'react';

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
		this.ctx = null;
		this.tacks = [];
		this.startX = 0;
		this.startY = 0;
	}
	draw = () => {
		this.ctx.beginPath();
		this.ctx.fillStyle = '#81d8e6';
		this.ctx.fillRect(0, 0, this.props.stageWidth, this.props.stageHeight);
		this.ctx.closePath();
	}
	componentDidMount() {
		this.ctx = this.canvasRef.current.getContext('2d');
		this.draw();
	}
	componentDidUpdate() {
		this.draw();
	}
	create = (e) => {
		// this.ctx.beginPath();
		// this.ctx.fillStyle = '#ff0000';
		// this.ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2, false);
		// this.ctx.fill();
		this.tacks.push({x:e.clientX, y:e.clientY});

		this.ctx.beginPath();
		this.ctx.strokeStyle = '#ffffff';
		if (this.tacks.length === 1) {
			this.startX = this.tacks[0].x;
			this.startY = this.tacks[0].y;
		} else {
			let i = this.tacks.length;
			this.ctx.moveTo(this.startX, this.startY);
			this.ctx.lineTo(this.tacks[i - 1].x, this.tacks[i - 1].y);
			this.ctx.stroke();
			this.startX = this.tacks[i-1].x;
			this.startY = this.tacks[i-1].y;
		}
		const btn = document.createElement('button');
		document.getElementById('my_canvas').appendChild(btn);
		btn.style.position = 'absolute';
		btn.style.top = e.clientY + 'px';
		btn.style.left = e.clientX + 'px';
		btn.style.backgroundColor = '#0a4180';
		btn.style.color = 'white';
		btn.innerHTML = 'TPRI';
		btn.onclick = this.props.open;
	}
	render() {
		return (
			<div id="my_canvas">
				<canvas
				ref={this.canvasRef}
				width={this.props.stageWidth}
				height={this.props.stageHeight}
				onClick={this.create}
				/>
			</div>
		);
	}
}

export default Canvas;
