'use strict';

var socket = io();
//var parser = require('./parser');
var isFileExists = require('./validator');
var drawPlaylist = require('./drawPlaylist');

var startParsing = function () {
  var inputEl = document.getElementById('fileinput');

  if (!isFileExists(inputEl)) {
    // Compute error
    alert('Please add permitted file!')
    return;
  }

  socket.emit('start_parsing', inputEl.files[0]);
}


socket.on('start_parsing', function(playlist){
  console.log(playlist);
  drawPlaylist(playlist);
});


window.startParsing = startParsing;








//
