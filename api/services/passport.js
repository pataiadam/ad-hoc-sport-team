var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

function findById(id, fn) {
    User.findOne(id).done(function (err, user) {
        if (err) {
            return fn(null, null);
        } else {
            return fn(null, user);
        }
    });
}

function findByFacebookId(id, fn) {
    User.findOne({
        facebookId: id
    }).exec(function (err, user) {
        if (err) {
            return fn(null, null);
        } else {
            return fn(null, user);
        }
    });
}

passport.serializeUser(function (user, done) {
    sails.log.debug(user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({
        clientID: "820254074716431",
        clientSecret: "bb28d07f162047e9f10e36ad868bb4c8",
        callbackURL: "http://localhost:1337/user/facebook/callback",
        enableProof: false
    }, function (accessToken, refreshToken, profile, done) {
        findByFacebookId(profile.id, function (err, user) {
            if (!user) {
                User.create({
                    facebookId: profile.id,
                    name: profile.displayName,
                    email: profile._json.email
                }).exec(function (err, user) {
                    if (user) {
                        return done(null, user, {
                            message: 'Logged In Successfully'
                        });
                    } else {
                        return done(err, null, {
                            message: 'There was an error logging you in with Facebook'
                        });
                    }
                });
            } else {
                return done(null, user, {
                    message: 'Logged In Successfully'
                });
            }
        });
    }
));