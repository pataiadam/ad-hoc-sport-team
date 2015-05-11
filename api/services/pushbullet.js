
var PushBullet = require('pushbullet');
var pusher = new PushBullet('v1xEsP36afBHtki0yXJfwNm6rZ3tT9JvVFujDRPUFzVzo');

module.exports={
    sendNotification: function(deviceParams, noteTitle, noteBody, cb){
        pusher.note(deviceParams, noteTitle, noteBody, function(error, response) {
            return cb(null);
        });

    },

    createContact: function(name, mail,cb){
        pusher.createContact(name, mail, function(error, response) {
            return cb(null);
        });
    }
};