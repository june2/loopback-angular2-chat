const moment = require('moment');
let AccessToken = null;
let Message = null;

exports.initSocket = function(app, io){

	io.on('connection', function(socket){		

		// from client
		socket.on('message:send', (data) => {					
			if(data && data.text && !data.text !== ''){								
				socket.broadcast.emit('message:receive', {text:data.text, time:moment().format('LT')});								
			}
		});

		socket.on('disconnect', function(){
			console.log('user disconnected');			
		});
	});

};
