var express = require('express');
var router = express.Router();
var db = require('../db/db.js');

/* GET home page. */
router.get('/', function (req, res, next){
	res.render('splash');
})

router.get('/map', function(req, res, next) {
  db.get_incidents(function (err, incidents) {
  	var all_incidents = incidents;
  	db.get_distinct_locations(function (err, locations) {
  		db.location_frequency(function (err, frequencies) {
  			//console.log(all_incidents);
  			res.render('index', {incidents : incidents, locations : locations, frequencies : frequencies});
  		})
  	})
  });
});

module.exports = router;
