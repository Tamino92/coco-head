/**
 * http://usejsdoc.org/
 */
var recognition;
var final_transcript = '';
var ignore_onend ;
var first_char = /\S/;

function capitalize(s) {
	  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}


var socket = io.connect('http://192.168.1.31:3000');
  socket.on('news', function (data) {
    console.log(data);
});
  
/**
 * Data should be : 
 * 			{
 * 			"lang" : "fr-FR",
 * 			"text" : le texte,
 * 			"pitch" : le pitch, (entre 0 et 2)
 * 			"rate" : le rate", (entre 0 et 2)
 * 			"volume" : le volume, (entre 0 et 1) 
 * 			"voice" : "Google français",
 * 			"repeat" : default 1,
 * 			"delay" : in millis between two repetitions
 * }
 */ 
socket.on('say', function (data) {
  var utterance = new SpeechSynthesisUtterance(data.text);
  var voices = window.speechSynthesis.getVoices();
  utterance.voice = voices.filter(function(voice) { return voice.name == data.voice; })[0];
  utterance.lang = data.lang ;
  utterance.pitch = parseFloat(data.pitch) ;
  utterance.rate = parseFloat(data.rate) ;
  utterance.volume = parseFloat(data.volume) ;
  window.speechSynthesis.speak(utterance);  

});

/**
 * Pour l'instant, pas besoin de routeur
 */
/*
var AppRouter = new (Backbone.Router.extend({
    routes : {
        'index.html' : 'home',
        '' : 'home',
        '*path' : 'notFound'
    },
    initialize : function(){
    },
    home : function(){

    },
    notFound : function(path){
  	 console.log(path) ;
	},
    start : function(){
        Backbone.history.start({pushState : true, root : ''}) ;
    }

}));

$(function(){AppRouter.start()}) ;
*/

$(function(){ 
	console.log('Document ready');
	$('#voice_btn').on('click',function(evt){
    	console.log('speech') ;
    	recognition.start() ;
    });
	recognition = new webkitSpeechRecognition();
	//recognition = new SpeechRecognition();
	recognition.continuous = false;
	recognition.interimResults = false;
	recognition.onstart = function() {
		$("#toto_ear").attr("src", "./images/toto_ear_anim.gif?");
	    recognizing = true;		    
	};
	recognition.onerror = function(event) {
		if (event.error == 'no-speech') {  
		    console.log('info_no_speech');
		     ignore_onend = true;
		}
		if (event.error == 'audio-capture') {
		    	console.log('info_no_microphone');
		    	ignore_onend = true;
		}
		if (event.error == 'not-allowed') {
			if (event.timeStamp - start_timestamp < 100) {
		    	  console.log('info_blocked');
		    } else {
		    	console.log('info_denied');
		    }
		    ignore_onend = true;
		}
	};
	recognition.onend = function() {
		recognizing = false;
		$("#toto_ear").attr("src", "./images/toto_ear_fix.gif?");
		
		if (ignore_onend) {
			return;
		}
		if (!final_transcript) {
			return;
	    };		    
	};
	recognition.onresult = function(event) {
		//var interim_transcript = '';
		if (typeof(event.results) == 'undefined') {
			recognition.onend = null;
			recognition.stop();
			//upgrade();
			return;
		}
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				final_transcript += event.results[i][0].transcript;
			} else {
				//interim_transcript += event.results[i][0].transcript;
			}
		}
		final_transcript = capitalize(final_transcript);
		//console.log(interim_transcript);
		$("#toto_speech_recognized").text(final_transcript) ;
		$("#toto_speech_recognized_panel").trigger('create') ;
		console.log(final_transcript);
		final_transcript = '' ;
		recognition.stop() ;
	};
});



