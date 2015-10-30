/**
 * http://usejsdoc.org/
 * Router in charge of any "Say" command using TTS API
 */

var router = require('express').Router() ;
var bodyParser = require('body-parser') ;
router.use(bodyParser.json()) ;


var eartBeat = {
				module : "Coco-voice",
				version : "0.1",
				status : "Alive ! Again !"
				};


/**
 * Managing default route
 */
router.route('/')
.get(function(request,response){
	console.log(JSON.stringify(request.body)) ;
	response.status(200).json(eartBeat) ;
})
.post(function(request,response){
	console.log(JSON.stringify(request.body)) ;
	console.log(request.body.lang) ;
	response.status(200).json("recieved post request") ;
});

module.exports = router ;