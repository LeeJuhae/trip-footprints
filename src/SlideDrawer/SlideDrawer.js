import React, { useState } from 'react';
import { storage } from "../firebase/firebase"
import Gallery from 'react-photo-gallery';
import './SlideDrawer.css';

function SlideDrawer({isOpen}) {
	const [imageAsFiles, setImageAsFile] = useState([]);
	const [imageAsUrl, setImageAsUrl] = useState([]);

	// const allInputs = {imgUrl: ''}
	// const [imageAsUrl, setImageAsUrl] = useState(allInputs)

	const handleImageAsFile = (e) => {
		for(let i = 0 ; i < e.target.files.length ; i++) {
			const newFile = e.target.files[i];
			newFile['id'] = Math.random() * 100;
			setImageAsFile(prevState => [...prevState, {
				file: newFile,
				src: URL.createObjectURL(newFile),
				width: 1,
				height:1
			}]);
		}
		// const image = e.target.files[0]
		// setImageAsFile(imageFile => (image))
	}

	const handleFireBaseUpload = e => {
		e.preventDefault()
		imageAsFiles.forEach(imageAsFile => {
			console.log('start of upload')
			// async magic goes here...
			if(imageAsFile === '') {
				console.error(`not an image, the image file is a ${typeof(imageAsFile.file)}`)
			}
			const uploadTask = storage.ref(`/images/${imageAsFile.file.name}`).put(imageAsFile.file)
			//initiates the firebase side uploading
			uploadTask.on('state_changed',
			(snapShot) => {
				//takes a snap shot of the process as it is happening
				console.log(snapShot)
			}, (err) => {
				//catches the errors
				console.log(err)
			}, () => {
				// gets the functions from storage refences the image storage in firebase by the children
				// gets the download url then sets the image from firebase as the value for the imgUrl key:
				storage.ref('images').child(imageAsFile.file.name).getDownloadURL()
				.then(fireBaseUrl => {
					setImageAsUrl(prevObject => [...prevObject, fireBaseUrl]);
				// setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
				})
			})
		})
	}

	let drawerClasses = isOpen ? 'side-drawer open' : 'side-drawer';
	return(
		console.log("files", imageAsFiles),
		<div className={drawerClasses}>
			<h1 align="center">Location</h1>
			<form onSubmit={handleFireBaseUpload}>
				<input type="file" multiple onChange={handleImageAsFile}/>
				<Gallery photos={imageAsFiles}/>
				{/* {imageAsFiles.map((file) =>
					<img src={URL.createObjectURL(file)}
						key={file.id}
						width="120"
						height="180"
						alt={file.id}
					/>
				)} */}
				<button>Leave a fooTPRInts</button>
			</form>
		</div>
	);
}

export default SlideDrawer;
