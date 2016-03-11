

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
};


module.exports = {
	openDB: openDB,
	closeDB: closeDB,
	createTable: createTable,
	readTable: readTable,
	clearTable: clearTable,
}
