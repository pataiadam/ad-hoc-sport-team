/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      facebookId: {
          type: 'string',
          required: true,
          unique: true
      },
      name: {
          type: 'string'
      },
      email: {
          type: 'string'
      }
  }
};

