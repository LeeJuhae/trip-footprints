import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

var firebaseConfig = {
	/*
	apiKey:
	authDomain:
	databaseURL:
	projectId:
	storageBucket:
	messagingSenderId:
	appId:
	measurementId:
	*/
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const storage = firebase.storage();
const db = firebase.firestore();

export { storage, db, firebase };
