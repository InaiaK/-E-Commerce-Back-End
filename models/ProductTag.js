const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
     product_id: {
      type: DataTypes.INTEGER,
      isNumeric: true,  // will only allow numbers
      allowNull: false,
      primaryKey: true,
      unique: true,
   
    },
    tag_id: {
      type: DataTypes.INTEGER,
      isNumeric: true,  // will only allow numbers
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
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
