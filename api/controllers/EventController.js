module.exports = {
    create: function(req, res){
        if(!!req.body && !!req.body.latitude && !!req.body.longitude) {
            Event.create(req.body).exec(function (err) {
                if (!!err) {
                    sails.log.error(err);
                    return res.redirect('/');
                }
                res.redirect('/home/index?lat='+req.body.latitude+'&lon='+req.body.longitude);
            });
        } else{
            return res.redirect('/');
        }
    },

    show: function(req, res){
        Event.findOne(req.query.id).exec(function (err, event) {
            if (!!err) {
                sails.log.error(err);
                return res.redirect('/');
            }
            var ic=false;
            if(req.session.user!==undefined){
                ic= event.creator===req.session.user.id;
            }
            res.view({event: event, isCreator:ic});
        });
    },

    update: function(req, res){
        if(req.method==='GET'){
            if(req.session.user===undefined && req.query.id===undefined){
                return res.redirect('/login');
            }
            Event.findOne(req.query.id).exec(function(err, event){
                if(err) {
                    sails.log.debug(err);
                    return res.redirect('/login');
                }
                return res.view(event);
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
    },

    destroy: function(req, res){

    },

    join: function(req, res){

    }
};

