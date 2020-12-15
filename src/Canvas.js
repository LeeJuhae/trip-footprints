import React, { useEffect, useState } from 'react';
import { firebase, db } from "./secret/firebase";

function Canvas(props) {
	const user_id = localStorage.getItem('id');
	const db_ref = db.collection('tacks').doc(user_id);

	let [width, setWidth] = useState(window.innerWidth);
	let [height, setHeight] = useState(window.innerHeight);
	let address = '';

	let map = null;

	const resize = () => {
		setWidth(document.body.clientWidth);
		setHeight(document.body.clientHeight);
	};

	window.addEventListener('resize', resize);

	function searchDetailAddrFromCoords(coords, callback) {

		// 좌표로 법정동 상세 주소 정보 요청.
		const geocoder = new window.kakao.maps.services.Geocoder();
		geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
	}

	useEffect(() => {
		const container = document.getElementById('map');
		const mapOptions = {
			center: new window.kakao.maps.LatLng(35, 127.5),
			level: 13,
			minLevel: 10
		};

		map = new window.kakao.maps.Map(container, mapOptions);

		// Add event listener on kakao map.
		// If map is cliked, create a marker(tack) on that location.
		window.kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

			setTack(mouseEvent.latLng);
			// 좌표로 주소 알아내기
			searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
				if (status === window.kakao.maps.services.Status.OK) {
					var detailAddr = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
					address = detailAddr;
				}
			});
		})
		getTacks();
	}, [width, height]);

	const setTack = (latlng) => {
		const marker = new window.kakao.maps.Marker({
			position: map.getCenter(),
			clickable: true
		});

		window.kakao.maps.event.addListener(marker, 'click', function(e){
			props.open(marker.getPosition(), address);
		});

		marker.setPosition(latlng);
		marker.setMap(map);

		db_ref.get().then(function(doc){
			if (!doc.exists)
				db_ref.set({location: []});
			db_ref.update({
				location: firebase.firestore.FieldValue.arrayUnion(`${latlng.getLat()}-${latlng.getLng()}`)
			}).then( function() {
				console.log('update location');
			}).catch(
				(err) => console.error(err)
			);
		})
	};

	const getTacks = () => {
		db_ref.get().then(function(doc){
			if (doc.exists) {
				const tacks = doc.data().location;
				for (let i = 0 ; i < tacks.length ; i++) {
					const loc = tacks[i].split('-');
					const lat = loc[0];
					const lng = loc[1];
					const latlng = new window.kakao.maps.LatLng(lat, lng);
					const marker = new window.kakao.maps.Marker({
						position: map.getCenter(),
						clickable: true
					});
					window.kakao.maps.event.addListener(marker, 'click', function(e){
						props.open(marker.getPosition());
					})
					marker.setPosition(latlng);
					marker.setMap(map);
				}
			}
		})
	}

	return (
		<div style={{width: width, height: height}} id="map">
		</div>
	);
}

export default Canvas;
