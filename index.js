let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http , {origins : '*:*'});

io.on('connection', (socket) => {
  console.log('user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('add-message', (message) => {
  	console.log(message);
    io.emit('message', {type:'new-message', text: message});    
  });
});

http.listen(5000, () => {
  console.log('Socket Logger started on port 5000');
});
