// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    product_name: {
      type: DataTypes.STRING,
      notEmpty: true, // don't allow empty strings
      allowNull: false,
      unique: true,
      primaryKey: true,
    
    },
    price: {
      type: DataTypes.INTEGER,
      isNumeric: true,  // will only allow numbers
      allowNull: false,
      primaryKey: true,
 
    },
    stock: {
      type: DataTypes.INTEGER,
      isNumeric: true,  // will only allow numbers
      allowNull: false,
      primaryKey: true,

    },
    category_id: {
      type: DataTypes.INTEGER,
      isNumeric: true,  // will only allow numbers
      allowNull: false,
      unique: true,
      primaryKey: true,
    
    },


    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
