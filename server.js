/*
 Module dependencies:

 - Express
 - Http (to run Express)
 - Body parser (to parse JSON requests)
 - Underscore (because it's cool)
 - Socket.IO

 It is a common practice to name the variables after the module name.
 Ex: http is the "http" module, express is the "express" module, etc.
 The only exception is Underscore, where we use, conveniently, an
 underscore. Oh, and "socket.io" is simply called io. Seriously, the
 rest should be named after its module name.

 */
var express = require("express"),
    app = express(),
    http = require("http").createServer(app),
    bodyParser = require("body-parser"),
    io = require("socket.io").listen(http),
    _ = require("underscore")

//Specify where the static content is
app.use(express.static("public", __dirname + "/public"));

/* Server config */
//Server's IP address
app.set("ipaddr", "127.0.0.1");

//Server's port number
var appPort = 8080;
if (process.argv[2] != null) {
    appPort = process.argv[2];
}
app.set("port", appPort);

//Specify where the static content is
app.use(express.static("public", __dirname + "/public"));

//Tells server to support JSON requests
app.use(bodyParser.json());


/* Server routing */
//var routes = require('./routes')(app);


// Socket IO - Begin
io.on('connection', function (client) {
    console.log('Client connected...');

    client.on('join', function (data) {
        console.log(data);
    });


    client.on('msg', function (data) {
        console.log(data);
        client.emit('msg', 'Server received: ' + data);
    });

    client.on('signUp', function (data) {
        console.log(data);
        client.emit('signUp', data);
        client.broadcast.emit('signUp', data);
    });
    
});

//io.on('connection', function (client) {
//    client.on('msg', function (data) {
//        console.log(data);
//        client.emit('msg', 'Server received: ' + data);
//    });
//});



// Socket IO - End



//Start the http server at port and IP defined before
http.listen(app.get("port"), app.get("ipaddr"), function () {
    console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});