/**
 * http://usejsdoc.org/
 */
var express = require('express') ;
var app = express() ;

/**
 * Default route
 */
app.use(express.static('public')) ;

/**
 * App locals setting
 */

/**
 * Routes declaration and mounting
 */
var say = require('./routes/say') ;
app.use('/say',say) ;

/**
* Coco voice start
*/
app.listen(3000,function(){
	console.log('Coco head listening on port 3000') ;
	
}) ;