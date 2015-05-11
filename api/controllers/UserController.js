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
        if(req.method==='GET'){
            if(req.session.user===undefined){
                return res.redirect('/login');
            }
            User.findOne(req.session.user).exec(function(err, user){
                if(err) {
                    sails.log.debug(err);
                    return res.redirect('/login');
                }
                return res.view(user);
            });
        }else{
            sails.log.debug(req.session.user);
            var up = {
                email: req.body.email,
                pushbullet: req.body.pushbullet,
                name: req.session.user.name,
                facebookId: req.session.user.facebookId,
                id: req.session.user.id
            };
            User.update(req.session.user,up).exec(function(err, user){
                if(err) {
                    sails.log.debug(err);
                    return res.redirect('/login');
                }
                req.session.user=user[0];
                return res.redirect('/user/update');
            });
        }
    }
};

