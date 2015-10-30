/**
 * http://usejsdoc.org/
 */


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
  /*
  voices.forEach(function(voice){
	  console.log("---- New Voice ----");
	  console.log(voice.name);
	  console.log(voice.lang);
	  console.log(voice.localService);
  }) ;
  console.log(data) ;*/
});
