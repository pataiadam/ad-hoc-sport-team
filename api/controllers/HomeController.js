module.exports = {
    index: function(req, res){
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
    },

    howItWorks: function(req, res){
        res.view();
    }
};

