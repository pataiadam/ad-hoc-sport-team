/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require('passport');

module.exports = {
    login: function (req, res) {
        res.view();
    },

    logout: function (req, res){
        req.session.authenticated = false;
        req.session.user = null;
        res.redirect('/home');
    },

    facebook: function (req, res, next) {
        passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_friends']},
            function (err, user) {
                req.logIn(user, function (err) {
                    if(err) {
                        sails.log.debug(err);
                        res.redirect('/login');
                    } else {
                        req.session.authenticated = true;
                        req.session.user = user;
                        res.redirect('/home');
                    }
                });
            })(req, res, next);
    },

    callback: function (req, res, next) {
        return next();
    },

    update: function (req, res) {
        res.view();
    }
};

