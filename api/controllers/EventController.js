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

    },

    update: function(req, res){

    },

    destroy: function(){

    }
};

