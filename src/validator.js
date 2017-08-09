'use strict';

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
