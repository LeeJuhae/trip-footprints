import React, { useState } from 'react';
import { storage } from "./firebase/firebase"
import Gallery from 'react-grid-gallery';
import MyDropzone from './MyDropzone';
import './styles/SlideDrawer.css';

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
				thumbnail: URL.createObjectURL(newFile),
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
		<div className={drawerClasses}>
			<div id="gallery">
				<Gallery id="slide-pic"
					images={imageAsFiles}
					enableLightbox={true}/>
			</div>
			<div id="controller">
				<h1 id="wrap-text">locaTIon</h1>
				<form onSubmit={handleFireBaseUpload}  id="wrap-form">
					{/* <input type="file" id="file-selector" multiple onChange={handleImageAsFile}/> */}
					<MyDropzone swaggerRead={handleImageAsFile} />
					<div id="file-list">
						<ul id="file-ul">
						{imageAsFiles.map((item)=>
							<li key={item.file.name} style={{textAlign : "left", overflow: "hidden"}}>
								<span>{item.file.name}</span>
							</li>
						)}
						</ul>
					</div>
					<button id="fb-btn">Leave a fooTPRInts</button>
				</form>
			</div>
		</div>
	);
}

export default SlideDrawer;
