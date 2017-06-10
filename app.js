var utils = require("./utils");
var server =utils.createApp().listen("145", function () {
    console.log("Server is running on port:145");
})

var http = require("http");

console.log("socket is running")
var socket = require("socket.io");
var io = socket(server);
io.sockets.on("connection", newConnection);
var a = [];
var clients = [];
function newConnection(socket) {
    console.log("new coonection: " + socket.id);
    clients.push(socket.id);
    socket.on("Usermsg", SendingMsg)
}
function SendingMsg(data) {
    a.push(data.message)
    io.sockets.emit('Usermsg', a);
    //socket.broadcast.emit('Usermsg', data); // everyone gets it but the sender
    console.log(a)
    setTimeout(function () {
        for (var i = 0; i < clients.length; i++) {
            var client = clients[i];
            io.sockets.connected[client].emit("greeting", "Howdy, User 1!");
        }
        //io.sockets.connected[clients[0]].emit("greeting", "Howdy, User 1!");
        //io.sockets.connected[clients[1]].emit("greeting", "Hey there, User 2");

        // If you're using Socket.io < 1.0, you need to use io.sockets.socket instead
        // io.sockets.socket(clients[0]).emit("greeting", "Howdy, User 1!");
    }, 5000);

}