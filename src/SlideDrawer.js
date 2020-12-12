import React, { useEffect, useState } from 'react';
import { firebase, storage, db } from "./secret/firebase"
import Gallery from 'react-grid-gallery';
import MyDropzone from './MyDropzone';
import './styles/SlideDrawer.css';
import btn_go_left from './resource/travel-left.svg';
import btn_go_right from './resource/travel-right.svg';

function SlideDrawer({isOpen, lat, lng}) {
	const user_id = localStorage.getItem('id');

	const [imageAsFiles, setImageAsFile] = useState([]);
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [drawerClasses, setDrawerClass] = useState('side-drawer');
	const [imageViewClasses, setImageViewClass] = useState('image-view');

	let str_lat = lat.toString().replace('.', 'd');
	let str_lng = lng.toString().replace('.', 'd');

	useEffect(() => {
		if (isOpen) {
			getImages();
		} else {
			setImageViewClass('image-view');
			setDrawerClass('side-drawer');
		}
	},[isOpen]);

	const handleGoLeftBtnClick = () => {
		setImageViewClass("image-view open2");
		setDrawerClass('side-drawer');
	};

	const handleGoRightBtnClick = () => {
		setDrawerClass('side-drawer open');
		setImageViewClass('image-view');
	};

	const getImages = () => {
		db.collection('users').doc(user_id).get()
		.then(function(doc) {
			if (doc.exists) {
				const temp = doc.data()[`${str_lat}-${str_lng}`];
				setUploadedFiles([]);
				if (temp !== undefined) {
					setImageViewClass('image-view open2');
					setDrawerClass('side-drawer');
					temp.forEach((img_url) => {
						setUploadedFiles(oldArray => [...oldArray, {
							src: img_url,
							thumbnail: img_url,
							thumbnailHeight: 180,
						}])
					})
				} else {
					setImageViewClass('image-view');
					setDrawerClass('side-drawer open');
				}
			} else {
				console.log("No such document!");
				setImageViewClass('image-view');
				setDrawerClass('side-drawer open');
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		})
	};

	const handleImageAsFile = (e) => {
		for(let i = 0 ; i < e.target.files.length ; i++) {
			const newFile = e.target.files[i];
			newFile['id'] = newFile.name + newFile.lastModified;
			setImageAsFile(prevState => [...prevState, {
				file: newFile,
				src: URL.createObjectURL(newFile),
				thumbnail: URL.createObjectURL(newFile),
				thumbnailHeight: 180
			}]);
		}
	};

	const handleFireBaseUpload = e => {
		e.preventDefault();
		const db_ref = db.collection('users').doc(user_id);

		imageAsFiles.forEach(imageAsFile => {
			console.log('start of upload')
			// async magic goes here...
			if(imageAsFile === '') {
				console.error(`not an image, the image file is a ${typeof(imageAsFile.file)}`)
			}
			const uploadTask = storage.ref(`/images/${user_id}/${lat}-${lng}/${imageAsFile.file.name}`).put(imageAsFile.file)
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
				storage.ref(`images/${user_id}/${lat}-${lng}/`).child(imageAsFile.file.name).getDownloadURL()
				.then(fireBaseUrl => {
					db_ref.get().then(function(doc){
						// const temp_lat = lat.toString().replace('.', 'd')
						// const temp_lng = lng.toString().replace('.', 'd')
						if (!doc.exists) {
							db_ref.set({[`${str_lat}-${str_lng}`]: []});
						}
						db_ref.update({
							[`${str_lat}-${str_lng}`]: firebase.firestore.FieldValue.arrayUnion(fireBaseUrl)
						}).then( function() {
							console.log('update firestore');
							getImages();
						}).catch(
							(err) => console.error(err)
						);
					})
				}).catch(err => {
					console.log(err)
				})
			})
		})
		setImageAsFile([]);
		setImageViewClass("image-view open2");
		setDrawerClass('side-drawer');
	};

	return(
		<div id="slide-drawer">
			<div className={imageViewClasses}>
				<div className="controller">
					<h1 className="wrap-text">({lat},{lng})</h1>
					<input type="date"></input>
					<br></br>
					<input type="date"/>
				</div>
				<div id="uploaded-gallery">
					<Gallery id="slide-pic2"
					images={uploadedFiles}
					enableLightbox={true}
					/>
				</div>
				<button type="button" className="btn" onClick={handleGoRightBtnClick}>
					<img src={btn_go_right} className="btn_img" alt="btn_go_right"/>
				</button>
			</div>
			<div className={drawerClasses}>
				<button type="button" className="btn" onClick={handleGoLeftBtnClick}>
					<img src={btn_go_left} className="btn_img" alt="btn_go_left" style={{WebkitTransform: "scaleX(-1)", transform: "scaleX(-1)"}}/>
				</button>
				<div id="gallery">
					<Gallery id="slide-pic"
						images={imageAsFiles}
						enableLightbox={true}
						/>
				</div>
				<div className="controller">
					<h1 className="wrap-text">({lat},{lng})</h1>
					<form onSubmit={handleFireBaseUpload}  id="wrap-form">
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
		</div>
	);
}

export default SlideDrawer;
