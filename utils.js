var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var session = require('client-sessions');
//var mail = require("./services//sendmail");

var middleware = require('./middleware');


module.exports.createApp = function () {
    var app = express();

    //Middlewares
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(session({
        cookieName: 'session', // cookie name dictates the key name added to the request object
        secret: 'ytdabtasokjmnnesukeoamcewlikdsnajsyhsgjls', // should be a large unguessable string
        duration: 24 * 60 * 1000,
        activeDuration: 10 * 10 * 1000, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
        cookie: {
        path: '/', // cookie will only be sent to requests under '/api' 
        maxAge: 15 * 10 * 1000, // duration of the cookie in milliseconds, defaults to duration above 
        ephemeral: false, // when true, cookie expires when the browser closes 
        httpOnly: true, // when true, cookie is not accessible from javascript 
        secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process 
    }
    }));
    app.use(express.static(path.join(__dirname, 'public')))
    
    app.use(require("./services/auth"))
    app.use(sendViewMiddleware)
    app.use(middleware.simpleAuth)

    app.use(require("./services/main"))
    
    return app;
}
//sending a path to Get methods
function sendViewMiddleware(req, res, next) {
    res.sendView = function (view) {
        return res.sendFile(__dirname + "/views/" + view)
    }
    return next();
}


module.exports.createUserSession = function (req, res, user) {
    var cleanUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        data: user.data || {},
    };
    req.session.user = cleanUser;
    req.user = cleanUser;
    res.locals.user = cleanUser;
};
/**
 * Ensure a user is logged in before allowing them to continue their request.
 *
 * If a user isn't logged in, they'll be redirected back to the login page.
 */
module.exports.requireLogin = function (req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        next();
    }
};
