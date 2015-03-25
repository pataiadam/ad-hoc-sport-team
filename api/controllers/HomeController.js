module.exports = {
    index: function(req, res){
        if (req.method === 'GET') {
            if(!!req.query && !!req.query.lat && !!req.query.lon){
                Event.find().sort({ createdAt: 'desc' }).populateAll().exec(function (err, events) {
                    if (!!err) {
                        sails.log.error(err);
                        return res.redirect('/');
                    }
                    var pos = {
                        lon: req.query.lon,
                        lat: req.query.lat
                    };
                    return res.view({events: events, pos: pos});
                });
            }else{
                return res.view();
            }
        } else {
            if(!!req.body && !!req.body.latitude && !!req.body.longitude) {
                Event.create(req.body).exec(function (err) {
                    if (!!err) {
                        sails.log.error(err);
                        return res.redirect('/');
                    }
                    res.redirect('/home/index?lat='+req.body.latitude+'&lon='+req.body.longitude);
                });
            }else{
                return res.redirect('/');
            }
        }
    },

    howItWorks: function(req, res){
        res.view();
    }
};

