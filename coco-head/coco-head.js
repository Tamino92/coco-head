/**
 * http://usejsdoc.org/
 */
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
/**
 * Default route
 */
app.use(express.static('public')) ;

/**
 * App locals setting
 */
app.locals.io = io ;

/**
 * Routes declaration and mounting
 */
var say = require('./routes/say') ;
app.use('/say',say) ;

/**
 * IO Callbacks
 */
io.on('connection',function(client){
	console.log('client connected') ;
	client.emit('news',{ "message" : "Hello from coco-head"}) ;
});


/**
* Coco head start
*/
server.listen(3000,function(){
	console.log('Coco head listening on port 3000') ;
	
}) ;
