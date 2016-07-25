'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize("fb_friend_database", "root", null,{
  host: 'localhost',
  dialect: 'sqlite',
  storage: './database.db'
});

module.exports = function(){
  var Friend = sequelize.define('Friend', {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    },
  }, {
    timestamps: false
  });

  Friend.sync({force: true});

  return Friend;
};
