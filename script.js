function createMap(){
    var iSizeX = 20;
    var iSizeY = 20;
    var latlngs = [
        [1.45165, 110.44186],
        [1.45642, 110.43967],
        [1.45679, 110.44339]
    ];
    const markArr = [];

    var map = L.map('map').fitBounds(latlngs);
    var myIcon = L.icon({
        iconUrl : './circle.png',
        iconSize: [iSizeX, iSizeY],
        iconAnchor: [iSizeX/2, iSizeY/2],
    });
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'sk.eyJ1IjoiYXJ6bWluIiwiYSI6ImNsM2I4cnVpazA0cmEzaXA0N2lwcmlwdHgifQ.vcRTx66CKN9A9jKxToSNbA'
    }).addTo(map);
    var routing = L.Routing.control({
        waypoints: [
            L.latLng(1.45165, 110.44186),
            L.latLng(1.45642, 110.43967),
            L.latLng(1.45679, 110.44339)
        ],
        draggableWaypoints: false,
        routeWhileDragging: false,
        createMarker: function() { return null; },
        lineOptions : {
            addWaypoints: false
        }
    }).addTo(map);
    var userMark = L.marker([0,0]).addTo(map);
    userMark.setIcon(myIcon);
    latlngs.forEach((point)=>{
        markArr.push(L.marker(point).addTo(map));
    });
    markArr[1].bindPopup('<div style="width: 250px; display:flex; flex-direction: column; justify-content: center; align-items: center;"><img style="width: 250px; height: 150px; object-fit: cover;" src="https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?cs=srgb&dl=pexels-kaique-rocha-65438.jpg&fm=jpg&w=1280&h=1787"/><div style="font-weight: bold;">Building 1</div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod interdum tellus.</div><div style="display:flex; justify-content: center; align-items: center; margin-top:10px;"><div style="display:flex;"><a style="flex:1;display:flex; justify-content: center; align-items: center;" href=""><img style="width: 70%;" src="3d-icon.png"/></a><a style="flex:1;display:flex; justify-content: center; align-items: center;" href=""><img style="width: 70%;" src="360-icons.png"/></a></div></div></div>');
    map.on('popupopen', function(e) {
        var px = map.project(e.popup._latlng);
        px.y -= e.popup._container.clientHeight/2;
        map.panTo(map.unproject(px),{animate: true});
    });
    map.on('locationfound', function(e){
        userMark.setLatLng(e.latlng);
    });
    var lOptions = {
        enableHighAccuracy : false,
        timeout : 2000,
        maximumAge : 0
    }
    updateLocation(userMark);
    /*
    var locator = navigator.geolocation.watchPosition((pos)=>{
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        userMark.setLatLng([lat,lng]);
        console.log('Lat and Lng is '+lat+', '+lng);
    }, ()=>{
        console.log("Error when fetching location.");
    }, lOptions);*/
    /*map.locate({
        setView: true,
        maxZoom: 17,
        enableHighAccuracy: true,
        watch: true
    });*/
    
    //console.log(calcDistance([1.45165, 110.44186],[1.45642, 110.43967]));

    /*document.getElementById('freemode').onclick =  () =>{
        map.stopLocate();
    };*/

    var nearBuilding = false;
    var nearbyBuilding;
    userMark.on('move', (e)=>{
        markArr.forEach((marker)=>{
            var userPoint = [userMark.getLatLng().lat,userMark.getLatLng().lng];
            var markPoint = [marker.getLatLng().lat,marker.getLatLng().lng];
            if((calcDistance(userPoint,markPoint)) <= 0.00085){
                nearbyBuilding = marker.getLatLng();
                marker.openPopup();
                nearBuilding = true;
            }else{
                if(nearBuilding && marker.getLatLng() == nearbyBuilding){
                    //console.log(calcDistance(userPoint,markPoint));
                    //console.log('leaving');
                    marker.closePopup();
                    map.panTo(userMark.getLatLng());
                    nearBuilding = false;
                } 
            }
        })
    });
    document.getElementById('centerBtn').onclick = () => {
        map.panTo(userMark.getLatLng());
    };

    /*document.getElementById('up').onclick = () => {userMark.setLatLng({lat : userMark.getLatLng().lat + 0.00005, lng: userMark.getLatLng().lng});};
    document.getElementById('down').onclick = () => {userMark.setLatLng({lat : userMark.getLatLng().lat - 0.00005, lng: userMark.getLatLng().lng});};
    document.getElementById('left').onclick = () => {userMark.setLatLng({lat : userMark.getLatLng().lat, lng: userMark.getLatLng().lng - 0.00005});};
    document.getElementById('right').onclick = () => {userMark.setLatLng({lat : userMark.getLatLng().lat, lng: userMark.getLatLng().lng  + 0.00005});};
    */
    document.addEventListener('keypress', (event) => {
        var key = event.key;
        switch(key){
            case 'i':
                userMark.setLatLng({lat : userMark.getLatLng().lat + 0.00005, lng: userMark.getLatLng().lng});
                break;
            case 'k':
                userMark.setLatLng({lat : userMark.getLatLng().lat - 0.00005, lng: userMark.getLatLng().lng});
                break;
            case 'j':
                userMark.setLatLng({lat : userMark.getLatLng().lat, lng: userMark.getLatLng().lng - 0.00005});
                break;
            case 'l':
                userMark.setLatLng({lat : userMark.getLatLng().lat, lng: userMark.getLatLng().lng  + 0.00005});
                break;
            case 'e':
                map.stopLocate();
        }
        // Alert the key name and key code on keydown

      }, false);
    // zoom the map to the polyline
}

function calcDistance(p1,p2){
    return(Math.sqrt(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2)));
};

function closeWelcome(){
    document.getElementById('welcomeBox').remove();
}

async function updateLocation(mark){
    setInterval(()=>{
        navigator.geolocation.getCurrentPosition((pos)=>{
            var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;
            console.log(pos.coords);
            mark.setLatLng([lat,lng]);
        })
    },3000);
}
