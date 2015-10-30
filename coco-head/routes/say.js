/**
 * http://usejsdoc.org/
 * Router in charge of any "Say"
 */

var router = require('express').Router() ;
var bodyParser = require('body-parser') ;

router.use(bodyParser.json()) ;

var eartBeat = {
				module : "Coco-voice",
				version : "0.1",
				status : "Alive ! Again !"
				};

var mood = {
	deuxDeTension : {pitch : 0,rate : 0.1},
	mou : {pitch : 1,rate : 0.5},
	normal : {pitch : 1,rate : 1},
	normalvener : {pitch : 2,rate : 1},
	speed : {pitch : 0,rate : 1.3},
	speedvener : {pitch : 2,rate : 1.3},
	barj : {pitch : 2,rate : 2},
}

/**
 * Managing default route
 */
router.route('/')
.get(function(request,response){
	console.log(JSON.stringify(request.body)) ;
	response.status(200).json(eartBeat) ;
})

/**
 * When a 'say' post is recieved the data shoud look like that : 
 * {
 * 		text : "<text>",
 * 		mood : 2detension/mou/normal/speed/vener,
 * 		volume : max 1,
 * 		repeat : #of repetitions
 * 		delay : in millis between two repetitions
 * }
 * 
 */
.post(function(request,response){
	console.log(JSON.stringify(request.body)) ;
	request.app.locals.io.emit('say',{ lang : "fr-FR",
										text : request.body.text,
										pitch : mood[request.body.mood].pitch,
										rate : mood[request.body.mood].rate,
										volume : request.body.volume,
										repeat : request.body.repeat,
										delay : request.body.delay
									}) ;
	response.status(200).json("recieved post request") ;
});



module.exports = router ;