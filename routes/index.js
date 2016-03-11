var express = require('express');
var path 	= require('path');
var router 	= express.Router();
var dbutil 	= require('../backend/dbUtil');


router.get('/', function(req, res) {
	res.sendFile(path.resolve('client/index.html'));
});

module.exports = router;