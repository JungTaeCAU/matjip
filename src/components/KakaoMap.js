import React, { useEffect } from 'react';
import '../App.css';

const { kakao } = window;

const MapContainer = () => {

    
    useEffect(() => {
        let infowindow = new kakao.maps.InfoWindow({zIndex:1});
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};
        
        const map = new kakao.maps.Map(container, options);
    
    	const ps = new kakao.maps.services.Places(); 
        
        const handleResize = () => {
            map.relayout();
        };

        ps.keywordSearch('파이브가이즈', placesSearchCB); 

        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                let bounds = new kakao.maps.LatLngBounds();

                for (let i=0; i<data.length; i++) {
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       

                map.setBounds(bounds);
            } 
            
        }

        function displayMarker(place) {
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x) 
            });
            
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출
                infowindow.setContent('<div style="custom-infowindow">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }; // 컴포넌트가 언마운트될때 이벤트 리스너 제거

    }, []);



    return (
        <div className="mapWrapper">
            <div id='myMap' style={{
                width: '100%', 
                height: '100%'
            }}></div>
        </div>
        
    );
}




export default MapContainer;