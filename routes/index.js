var express = require('express');
var path 	= require('path');
var router 	= express.Router();
var dbutil 	= require('../backend/dbUtil');


router.get('/', function(req, res) {
	res.sendFile(path.resolve('client/index.html'));
});

router.post('/', function(req, res) {
	var stock 	= req.body;
	var db 		= dbutil.openDB();
	
	db.serialize(function() {

		db.all("SELECT * FROM stockInfo", function(err, rows) {
			var isExists = false;
			var curMaxID = 0;
			for (var i=0; i<rows.length; i++) {
				if (rows[i].id > curMaxID) curMaxID = rows[i].id;
				if (rows[i].abbr == stock.abbr) isExists = true;
			}
			if (!isExists) {
				db.serialize(function(){
					const abbr = stock.abbr;
					const daily = stock.daily;
					var curID = curMaxID + 1;
					var stmt = db.prepare("INSERT INTO stockInfo VALUES(?,?,?,?,?,?,?,?)");
					for (var i=0; i<daily.length; i++) {
						date = daily[i].Date;
						// const {open, high, low, close, volume} = daily[i];
						open = daily[i].open;
						high = daily[i].high;
						low = daily[i].low;
						close = daily[i].close;
						volume = daily[i].volume;
						stmt.run(curID+i, abbr, date, volume, open, high, low, close);
					}
					stmt.finalize();
					console.log("stock info has been stored in database");
				});
			}

			
		})

	});
	res.sendFile(path.resolve('client/index.html'));

});

module.exports = router;