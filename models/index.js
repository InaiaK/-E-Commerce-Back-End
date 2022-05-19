// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Products.belongToCategory()

// Categories have many Products
Category.belongsToMany(Products)



// Products belongToMany Tags (through ProductTag)
Products.belongsToMany(Tags, {
  through:{
    model: ProductTag,
    unique:false
  },
  as:''
});

// Tags belongToMany Products (through ProductTag)
Tags.belongsToMany(Products, {
  through:{
    model: ProductTag,
    unique:false
  },
  as:''
});




module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
