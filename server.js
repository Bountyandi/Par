var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var parseFile = require('./server/parser');


app.use(require('express').static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('start_parsing', function(file){
    var parsedData = parseFile(file);
    io.emit('start_parsing', parsedData);
  });
});


http.listen(3000, function(){
  console.log('listening on port: 3000');
});
