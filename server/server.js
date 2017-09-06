'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const socket = require('./boot/socket.js');

const app = module.exports = loopback();

app.start = function() {
	// start the web server
	return app.listen(function() {

		app.emit('started');

		let baseUrl = app.get('url').replace(/\/$/, '');
		console.log('Web server listening at: %s', baseUrl);

		if (app.get('loopback-component-explorer')) {
			let explorerPath = app.get('loopback-component-explorer').mountPath;
			console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
		}

	});
};


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
	if (err) throw err;

  	// start the server if `$ node server.js`
  	if (require.main === module){
    	app.io = require('socket.io')(app.start());
    	socket.initSocket(app, app.io);
    }

});
