var mysql = require('mysql');
var poolConfig = require('./config.js').poolConfig;

var pool = mysql.createPool(poolConfig);

exports.get_incidents = function(callback) {
	pool.getConnection(function (err, connection) {
		if(err) console.log(err);
		connection.query('SELECT * FROM incident',
			function (err, results){
				if(err) return callback(err);
				callback(null, results);
			})
		connection.release();
	})
}

exports.get_distinct_locations = function(callback) {
	pool.getConnection(function (err, connection) {
		if(err) console.log(err);
		connection.query('SELECT DISTINCT(location), lat, lng FROM incident;', 
			function (err, results){
				if(err) return callback(err);
				callback(null, results);
			})
		connection.release();
	})
}

exports.get_info_from_pId = function(id, callback) {
	pool.getConnection(function (err, connection) {
		if(err) console.log(err);
		connection.query('SELECT p_Id, datetime_occurred, report_number, agency, age, UI_affiliation, location, charge FROM incident WHERE p_Id = ?', id,
			function (err, results) {
				if(err) return callback(err);
				callback(null, results);
			})
		connection.release();
	})
}

exports.location_frequency = function(callback) {
	pool.getConnection(function (err, connection) {
		if(err) console.log(err);
		connection.query('SELECT location, lat, lng, COUNT(LOCATION) FROM incident GROUP BY location;',
			function(err, results){
				if(err) return callback(err);
				callback(null, results);
			})
		connection.release();
	})
}