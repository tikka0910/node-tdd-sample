'use strict';

module.exports = function(sequelize, DataTypes){
  var Friend = sequelize.define('Friend', {
    name: {
      type: DataTypes.STRING
    },
    facebookId:{
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    timestamps: false
  });

  return Friend;
};
