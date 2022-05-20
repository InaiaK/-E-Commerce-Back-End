const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

    // define columns
Category.init(
  {
    category_name: {
      // prevents duplicate CATEGORY NAME in DB
      type: DataTypes.STRING,
      unique: true,
      notEmpty: true, 
      allowNull: false,
      primaryKey: true,

    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
