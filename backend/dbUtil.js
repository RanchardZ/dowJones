
const APPL = {abbr: 'appl',
			  daily: [
			  	{Date: '20140101', volume: 1283712, open: 13.3, high: 15.5, low: 10.0, close: 13.3},
			  	{Date: '20140102', volume: 1231212, open: 13.5, high: 15.9, low: 10.5, close: 13.4}
			  ]};


var openDB = function() {
	var sqlite3 = require('sqlite3').verbose();
	return new sqlite3.Database('stocks');
};

var closeDB = function(db) {
	db.close()
};

var createTable = function(db) {
	db.run("CREATE TABLE stockInfo (id INT, abbr TEXT, date TEXT, volume REAL, open REAL, high REAL, low REAL, close REAL)");
};

var insertTable = function(db, stock) {
	db.serialize(function() {
		// const {abbr, daily} = stock;
		const abbr = stock.abbr;
		const daily = stock.daily;
		var cur_id = nextID(db) + 1;
		console.log(cur_id);
		var stmt = db.prepare("INSERT INTO stockInfo VALUES(?,?,?,?,?,?,?,?)");
		for (var i=0; i<daily.length; i++) {
			date = daily[i].Date.toString();
			// const {open, high, low, close, volume} = daily[i];
			open = daily[i].open;
			high = daily[i].high;
			low = daily[i].low;
			close = daily[i].close;
			volume = daily[i].volume;

			stmt.run(cur_id+i, abbr, date, volume, open, high, low, close);
		}
		stmt.finalize();
	});
};

var readTable = function(db) {
	db.each("SELECT * FROM stockInfo", function(err, row) {
		console.log(`id: ${row.id}, 
					 abbr: ${row.abbr}, 
					 date: ${row.date}, 
					 volume: ${row.volume}, 
					 open: ${row.open}, 
					 high: ${row.high}, 
					 low: ${row.low},
					 close: ${row.close}`)
	})
};

var clearTable = function(db) {
	db.run("DELETE FROM stockInfo");
}


var stockQuery = function(db, abbr) {
	
	db.serialize(function() {	
		var daily = dail;	
		// const sql = `SELECT * FROM stockInfo WHERE abbr = '${abbr}'`;
		const sql = `SELECT * FROM stockInfo WHERE abbr = '${abbr}'`;
		console.log(sql);
		db.each(sql, function(err, row) {
			console.log(row);
			if (row) {
				console.log("yes");
				daily.push({
					date: row.date,
					abbr: row.abbr,
					volume: row.volume,
					open: row.open,
					high: row.high,
					low: row.low,
					close: row.close
							});
			}
			console.log(daily);
		});
		// console.log(daily);
	});

	

	// var daily = [];
	// db.all("SELECT * FROM stockInfo WHERE abbr = ?", [abbr], function(err, rows) {
	// 	// console.log(rows);
	// 	return rows;
	// });
	// console.log(daily);


	
	// console.log(daily);
	// if (daily.length == 0) {
	// 	return null
	// } else {
	// 	const stock = {abbr: abbr, daily: daily};
	// 	console.log(stock);
	// 	return stock;
	// }
};



var nextID = function(db) {
	var maxId = 0
	db.serialize(function() {
		db.each("SELECT id FROM stockInfo", function(err, row) {
			if (row >= maxId)
				maxId = row
		});
	});
	return maxId;
};

module.exports = {
	openDB: openDB,
	closeDB: closeDB,
	createTable: createTable,
	insertTable: insertTable,
	readTable: readTable,
	clearTable: clearTable,
	stockQuery: stockQuery,
	nextID: nextID,
	appl: APPL
}
