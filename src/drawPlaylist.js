'use strict';

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
