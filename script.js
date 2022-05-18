function createMap(){
    var latlngs = [
        [1.46787, 110.42561],
        [1.46743, 110.4325],
        [1.47223, 110.42813]
    ];
    var map = L.map('map').fitBounds(latlngs);

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
          L.latLng(1.46787, 110.42561),
          L.latLng(1.46743, 110.4325),
          L.latLng(1.47223, 110.42813)
        ],
        draggableWaypoints: false,
        routeWhileDragging: false,
        lineOptions : {
            addWaypoints: false
        }
      }).addTo(map);
      var testMark = L.marker([1.46743, 110.4325]).addTo(map);
      testMark.bindPopup('<div style="width: 300px"><img style="width: 300px; height: 200px; object-fit: cover;" src="https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?cs=srgb&dl=pexels-kaique-rocha-65438.jpg&fm=jpg&w=1280&h=1787"/><div style="font-weight: bold;">Building 1</div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod interdum tellus.</div><div style="display:flex; margin-top:10px;"><a style="flex:1" href=""><img style="width: 80%;" src="3d-icon.png"/></a><a style="flex:1" href=""><img style="width: 80%;" src="360-icons.png"/></a></div></div>');
      map.on('popupopen', function(e) {
        var px = map.project(e.popup._latlng);
        px.y -= e.popup._container.clientHeight/2;
        map.panTo(map.unproject(px),{animate: true});
    });
    // zoom the map to the polyline
}