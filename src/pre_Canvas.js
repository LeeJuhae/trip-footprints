import React, { createRef, useEffect, useState } from 'react';
import { firebase, db } from "./secret/firebase";

function PreCanvas(props) {
	let [width, setWidth] = useState(document.body.clientWidth);
	let [height, setHeight] = useState(document.body.clientHeight);

	const canvasRef = createRef();
	let ctx = null;

	let startX = 0;
	let startY = 0;
	let tacks = [];
	const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

	const user_id = localStorage.getItem('id');
	const db_ref = db.collection('tacks').doc(user_id);

	const resize = () => {
		setWidth(document.body.clientWidth);
		setHeight(document.body.clientHeight);
	}

	window.addEventListener('resize', resize);
	useEffect(() => {
		ctx = canvasRef.current.getContext('2d');
		draw();
	}, [width, height]);

	const createBtn = (x, y) => {
		const btn = document.createElement('button');
		document.getElementById('my_canvas').appendChild(btn);

		btn.style.position = 'absolute';
		// btn.style.position = 'relative';
		btn.style.width = "20px";
		btn.style.height = "11px";
		btn.style.top = y - 10 + 'px';
		btn.style.left = x - 10 + 'px';
		// btn.style.top = (e.clientY / window.innerHeight) * 100 + '%';
		// btn.style.left = (e.clientX / window.innerWidth) * 100 + '%';
		// btn.style.offsetTop = e.clientY;
		// btn.style.offsetLeft = e.clientX;
		// btn.style.backgroundColor = '#0a4180';
		btn.style.backgroundColor = "Transparent";
		btn.style.color = 'white';
		btn.style.borderRadius = "80%";

		btn.style.fontFamily = 'Courier New';
		// btn.style.fontFamily = 'monospace';
		btn.innerText = `(${x},${y})`;
		btn.onclick = props.open;
	};

	const draw = () => {
		ctx.beginPath();
		ctx.fillStyle = 'rgb(184, 213, 255)';
		ctx.fillRect(0, 0, width, height);
		ctx.closePath();

		ctx.beginPath();
		ctx.strokeStyle = '#ffffff';

		db_ref.get().then(function(doc){
			if (doc.exists) {
				tacks = doc.data().location;
				for (let i = 0 ; i < tacks.length ; i++) {
					const loc = tacks[i].split('-');
					const x = loc[0];
					const y = loc[1];
					createBtn(x, y);

					if (i === 0) {
						startX = tacks[i].offsetLeft+10;
						startY = tacks[i].offsetTop-55;
					}
					if (i !== 0) {
						ctx.moveTo(startX, startY);
						ctx.lineTo(tacks[i].offsetLeft+10, tacks[i].offsetTop-55);
						ctx.stroke();
						startX = tacks[i].offsetLeft+10;
						startY = tacks[i].offsetTop-55;
					}
				}
			}
		})
	}

	const create = (e) => {
		// console.log(e.clientX, e.clientY)
		createBtn(e.clientX, e.clientY);
		db_ref.get().then(function(doc){
			if (!doc.exists)
				db_ref.set({location: []});
			db_ref.update({
				location: firebase.firestore.FieldValue.arrayUnion(`${e.clientX}-${e.clientY}`)
			}).then( function() {
				console.log('update location');
			}).catch(
				(err) => console.error(err)
			);
		})
	};


	return (
		<div id="my_canvas">
			{/* <canvas style={{position: "relative"}} */}
			<canvas style={{height: "calc(100vh-60px"}}
			ref={canvasRef}
			width={width}
			height={height}
			onClick={create}
			/>
		</div>
	);
}

export default PreCanvas;
