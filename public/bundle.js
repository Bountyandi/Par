/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var socket = io();
//var parser = require('./parser');
var isFileExists = __webpack_require__(1);
var drawPlaylist = __webpack_require__(2);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var permittedExtensions = [
  'm3u'
];

module.exports = function (inputEl){
  if (inputEl && isValidExtenson(inputEl)) {
    return true;
  }

  return false;
};

function isValidExtenson(inputEl){
  if (inputEl.files[0]) {
    var name = inputEl.files[0].name;
    var arr = name.split('.');
    var ext = arr[arr.length - 1];

    return permittedExtensions.indexOf(ext) != -1;
  }

  return false;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.log(this)
module.exports = function (playlist){
  var target = document.getElementById('playlist');
  target.innerHTML = '';

  var tracksList = generateTracks(playlist);
  var playlistHTML = generatePlaylistName(playlist.playlistName);
  var container = generateContainer(playlistHTML, tracksList);

  target.appendChild(container);
};

function generateContainer(playlistHTML, tracksList) {
  var container = document.createElement('div');
  container.appendChild(playlistHTML);
  container.appendChild(tracksList);

  return container;
};

function generatePlaylistName(playlistName) {
  var playlistHTML = document.createElement('h3');
  playlistHTML.innerHTML = playlistName;

  return playlistHTML;
}

function generateTracks(playlist){
  var list = document.createElement('div');

  playlist.items.forEach(function(item){
    var track = document.createElement('audio')
    track.setAttribute('controls', 'controls');
    track.innerHTML = '<source src="' + item.src + '">';

    var name = document.createElement('p');
    name.innerHTML = '<strong>' + item.name + '</strong>'

    list.appendChild(name);
    list.appendChild(track);
  });

  return list;
};


/***/ })
/******/ ]);