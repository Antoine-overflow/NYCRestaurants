var express = require('express');
var router = express.Router();

var bbox = "-73.8, 40.7, -73.5, 40.8"; //southwest_lng,southwest_lat,northeast_lng,northeast_lat

/* GET data. */
router.get('/', function(req, res, next) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/test', function(err, client) { //Database connection
      if (err) {
        throw err;
      }
      console.log("Connected to database");
      const db = client.db('test');
      db.collection('restaurants').find().toArray(function(err, result) {
        if (err) {
          throw err;
        }
        console.log("Processing");
        //console.log(result);
        res.send(result);
      });
    });
});

router.get('/:bbox', function(req, res, next) {
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect('mongodb://localhost:27017/test', function(err, client) { //Database connection
    if (err) {
      throw err;
    }
    console.log("Connected to database");
    var bbox = req.params.bbox;
    // console.log(bbox);
    // console.log(typeof(bbox));
    var bboxParsed = bbox.split(',');
    // console.log(bboxParsed[0]);
    // console.log(typeof(bboxParsed));
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
    //console.log(coordinate3);
    const db = client.db('test');
    db.collection('restaurants').find({location:
      {$geoWithin:
        {$geometry: 
          {
            type: "Polygon",
            coordinates: coordinate3,
          //   crs: {
          //     type: "name",
          //     properties: {name: "urn:x-mongodb:crs:strictwinding:EPSG:4326"}
          //  }
          }
        }
      }
    }).toArray(function(err, result) {
      if (err) {
        throw err;
      }
      console.log("Processing");
      //console.log(result);
      res.send(result);
    });
  });
});

module.exports = router;