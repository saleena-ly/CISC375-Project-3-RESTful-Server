var fs = require('fs');
var path = require('path');
var express = require('express');
var sqlite3 = require('sqlite3');
var bodyParser = require('body-parser');
var port = 8000;
var db_filename = path.join(__dirname, 'db', 'stpaul_crime.sqlite3');

var app = express();
app.use(bodyParser.urlencoded({extended: true})); //takes uploaded data and changes it from random string values to actual keys and values

var db = new sqlite3.Database(db_filename, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.log('Error opening ' + db_filename);
    }
    else {
        console.log('Now connected to ' + db_filename);
    }
});

app.get('/codes', (req, res) => {
	var codes = {};
	console.log(JSON.stringify(req));
	if(req != null)
	{
		//var codeReq = req.code.split(",");
	}
	var format = req.format;


	db.all('SELECT * FROM Codes', (err, rows) => {
		rows.forEach(incident => {
			if(req == null)
			{
				let key = "C" + incident.code;
				codes[key] = incident.incident_type;
			}
			else
			{
				/*
				for(let i = 0; i < codeReq.length; i++)
				{
					if(incident.code == codeReq[i])
					{
						let key = "C" + incident.code;
						codes[key] = incident.incident_type;
					}
				}
				*/
			}
		});

		res.type('json').send(codes);
	});
});

app.get('/neighborhoods', (req, res) => {
	var neighborhoods = {};

	db.all('SELECT * FROM Neighborhoods', (err, rows) => {
		rows.forEach(neighborhood => {
			let key = "N" + neighborhood.neighborhood_number;
			neighborhoods[key] = neighborhood.neighborhood_name;
		});
		res.type('json').send(neighborhoods);
	});
});

app.get('/incidents', (req, res) => {
	var incidents = {};

	db.all('SELECT * FROM Incidents', (err, rows) => {
		rows.forEach(incident => {
			let key = "I" + incident.case_number;
			let dateTime = incident.date_time.split("T");
			let date = dateTime[0];
			let time = dateTime[1];
			incidents[key] = {
				"date" : date,
				"time" : time,
				"code" : incident.code,
				"incident" : incident.incident,
				"police_grid" : incident.police_grid,
				"neighborhood_number" : incident.neighboorhood_number,
				"block" : incident.block
			}
		});
		res.type('json').send(incidents);
	});
});

app.put('/new-incident', (req, res) => {
	let dateTime = req.body.date + "T" + req.body.time;
	let things = [req.body.case_number, dateTime, req.body.code, req.body.incident, req.body.police_grid, req.body.neighborhood_number, req.body.block];
	let placeholders = things.map((things) => '(?)').join(',');
	let sql = 'INSERT INTO Incidents(case_number, date_time, code, incident, police_grid, neighborhood_number, block) VALUES ' + placeholders;

	db.run(sql, things,(err) => {
		if(err)
		{
			res.status(500).send(err.message);
		}
	});
});

app.listen(port);
console.log("listening to port " + port + "...");
