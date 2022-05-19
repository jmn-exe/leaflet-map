function calcDistance(p1,p2){
    return(Math.sqrt(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2)));
};

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
            L.latLng(1.55801, 110.35183),
            L.latLng(1.55831, 110.34698),
            L.latLng(1.55835, 110.34493),
            L.latLng(1.5391, 110.3373),
            L.latLng(1.543, 110.34117),
            L.latLng(1.55102, 110.34156),
            L.latLng(1.55321, 110.33327),
            L.latLng(1.55507, 110.32225),
            L.latLng(1.55769, 110.3408),
            L.latLng(1.55321, 110.33327),
            L.latLng(1.55412, 110.33445),
            L.latLng(1.56003, 110.3453),
            L.latLng(1.55757, 110.3486),
            L.latLng(1.55832, 110.35132)
        ],
        draggableWaypoints: false,
        routeWhileDragging: false,
        createMarker: function() { return null; },
        lineOptions : {
            addWaypoints: false
        }
    }).addTo(map);
    map.locate({
        setView: true,
        maxZoom: 16,
        watch: true
    });
    latlngs.forEach((point)=>{
        markArr.push(L.marker(point).addTo(map));
    })
    console.log(calcDistance([1.45165, 110.44186],[1.45642, 110.43967]));
    var userMark = L.marker([0,0]).addTo(map);
    userMark.setIcon(myIcon);
    markArr[1].bindPopup('<div style="width: 300px"><img style="width: 300px; height: 200px; object-fit: cover;" src="https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?cs=srgb&dl=pexels-kaique-rocha-65438.jpg&fm=jpg&w=1280&h=1787"/><div style="font-weight: bold;">Building 1</div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod interdum tellus.</div><div style="display:flex; align-items: center; vertical-align: center; margin-top:10px;"><a style="flex:1; align-items: center; vertical-align: center;" href=""><img style="width: 80%;" src="3d-icon.png"/></a><a style="flex:1; align-items: center; vertical-align: center;" href=""><img style="width: 80%;" src="360-icons.png"/></a></div></div>');
    map.on('popupopen', function(e) {
        var px = map.project(e.popup._latlng);
        px.y -= e.popup._container.clientHeight/2;
        map.panTo(map.unproject(px),{animate: true});
    });
    map.on('locationfound', function(e){
        userMark.setLatLng(e.latlng);
    });
    document.getElementById('freemode').onclick =  () =>{
        map.stopLocate();
    };
    userMark.on('move', (e)=>{
        markArr.forEach((marker)=>{
            var userPoint = [userMark.getLatLng().lat,userMark.getLatLng().lng];
            var markPoint = [marker.getLatLng().lat,marker.getLatLng().lng];
            console.log((calcDistance(userPoint,markPoint)));
            if((calcDistance(userPoint,markPoint)) <= 0.0007){
                marker.openPopup();
            }
        })
    });
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
        }
        // Alert the key name and key code on keydown
        
      }, false);
    // zoom the map to the polyline
}
