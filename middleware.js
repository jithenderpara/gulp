var login = require("./models/login");
var userSession = require("./usersession");
var utils = require('./utils');
/**
 * A simple authentication middleware for Express.
 *
 * This middleware will load users from session data, and handle all user
 * proxying for convenience.
 */
module.exports.simpleAuth = function (req, res, next) {
    if (req.session && req.session.user) {
        login.User.findOne({ email: req.session.user.email }, 'firstName lastName email data', function (err, user) {
            if (user) {
                utils.createUserSession(req, res, user);
            }
            next();
        });
    } else {
        next();
    }

}