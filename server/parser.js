'use strict';

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var statesNames = [
  '#PLAYLIST',
  '#EXTINF'
];

var GLOBAL_PLAYLIST = {
  playlistName: '',
  items: []
};

module.exports = function(sequence) {
  GLOBAL_PLAYLIST.items.length = 0; // clear from previous data
  var stringsArray = splitIntoStates(sequence);
  loopTheStates(stringsArray);

  return GLOBAL_PLAYLIST;
};

function splitIntoStates(sequence) {
  var decodedSequence = decoder.write(sequence);

  return decodedSequence.split('\r\n');
};

function loopTheStates(arr) {
  var resultObj = {};
  var currentState = '';

  for (var i = 0; i < arr.length; i++) {
    currentState = defineState(arr[i]);
    statesHandler[currentState].onEnter(arr[i], arr[i + 1]);
  };
};

function defineState(str) {
  var stateName = 'NONE';

  statesNames.forEach(function(name){
    if (str.indexOf(name) != -1 ) {
      return stateName = name;
    }
  });

  return stateName;
};

function spliceState(str, state) {
  return str.replace(state + ':', '');
};

var statesHandler = {

  'NONE': {
    name: 'NONE',
    onEnter: function(){
      //do nothing
    }
  },

  '#PLAYLIST': {
    name: '#PLAYLIST',
    onEnter: function(str){
      str = spliceState(str, this.name);

      GLOBAL_PLAYLIST.playlistName = str;
    }
  },

  '#EXTINF': {
    name: '#EXTINF',
    onEnter: function(str, src){
      str = spliceState(str, this.name);

      var values = str.split(',');

      var listItem = {
        length: values[0],
        name: values[1],
        src: src
      };

      GLOBAL_PLAYLIST.items.push(listItem);
    }
  }
};
