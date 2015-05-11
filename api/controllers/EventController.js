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
            EventMember.find({eventId: event.id}).exec(function(err, array){
                if (!!err) {
                    sails.log.error(err);
                    return res.redirect('/');
                }

                var flags = [], output = [], l = array.length, i;
                for( i=0; i<l; i++) {
                    if( flags[array[i].userId]) continue;
                    flags[array[i].userId] = true;
                    output.push(array[i].userId);
                }
                res.view({event: event, isCreator:ic, memberCount: output.length});
            });
        });
    },

    update: function(req, res){
        if(req.method==='GET'){
            if(req.session.user===undefined || req.query.id===undefined){
                return res.redirect('/');
            }
            Event.findOne(req.query.id).exec(function(err, event){
                if(err) {
                    sails.log.debug(err);
                    return res.redirect('/');
                }
                return res.view(event);
            });
        }else{
            Event.findOne(req.body.id).exec(function(err, event){
                if(err) {
                    sails.log.debug(err);
                    return res.redirect('/');
                }

                event.sport=req.body.sport;
                event.description=req.body.description;

                Event.update(req.body.id, event).exec(function(err, eventu){
                    if(err) {
                        sails.log.debug(err);
                        return res.redirect('/');
                    }
                    return res.view(eventu[0]);
                });
            });
        }
    },

    destroy: function(req, res){
        if(req.session.user===undefined || req.query.id===undefined){
            return res.redirect('/');
        }
        Event.destroy(req.query.id).exec(function(err){
            if(err) {
                sails.log.debug(err);
                return res.redirect('/');
            }
            res.redirect('/');
        });
    },

    join: function(req, res){
        if(req.session.user===undefined || req.query.id===undefined){
            return res.redirect('/');
        }
        EventMember.create({userId: req.session.user.id, eventId: req.query.id}).exec(function(err, em){
            if(err) {
                sails.log.debug(err);
                return res.redirect('/');
            }
            User.findOne(em.userId).exec(function(err, user) {
                if (err) {
                    sails.log.debug(err);
                    return res.redirect('/');
                }
                Event.findOne(em.eventId).exec(function(err, event) {
                    if (err) {
                        sails.log.debug(err);
                        return res.redirect('/');
                    }
                    var deviceParams = user.email;
                    var noteTitle = "Ad-hoc-notif";
                    var noteBody = "Sikeresen csatlakoztal a kovetkezohoz: "+event.sport;
                    pushbullet.sendNotification(deviceParams, noteTitle, noteBody, function(err){
                        if(err) {
                            sails.log.debug(err);
                            return res.redirect('/');
                        }
                        res.redirect('/event/show?id='+req.query.id);
                    });
                });
            });
        });
    }
};

