var map = L.map('map').setView([40.7,-73.9], 16);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYW50b2luZS1vdmVyZmxvdyIsImEiOiJja3o1ZnA2MTAwMXNiMm9tZ3FyaGY1cjZoIn0.D4dmBD7n3sq2aP7v48BN9A'
}).addTo(map);

var bbox = map.getBounds().toBBoxString();
//console.log(bbox);

function toCoord(bbox){
    var bboxParsed = bbox.split(',');
    var coordinate = new Array(); //southwest_lng,southwest_lat,northeast_lng,northeast_lat
    for (var i = 0; i<bboxParsed.length; i++){
      coordinate.push(Number(bboxParsed[i]));
    }
    var coordinate2 = new Array();

    //southwest
    coordinate2[0] = new Array();
    coordinate2[0].push(coordinate[0]);
    coordinate2[0].push(coordinate[1]);

    //southeast
    coordinate2[1] = new Array();
    coordinate2[1].push(coordinate[0]);
    coordinate2[1].push(coordinate[3]);

    //northeast
    coordinate2[2] = new Array();
    coordinate2[2].push(coordinate[2]);
    coordinate2[2].push(coordinate[3]);

    //northwest
    coordinate2[3] = new Array();
    coordinate2[3].push(coordinate[2]);
    coordinate2[3].push(coordinate[1]);

    //end of the loop
    coordinate2[4] = coordinate2[0];
    coordinate3 = new Array();
    coordinate3.push(coordinate2);

    return coordinate3;
}

console.log(toCoord(bbox));