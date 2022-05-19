const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    tag_name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
  },
},

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  },


);

module.exports = Tag;
