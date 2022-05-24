const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll();
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
    
      include: [{ model: Category, through: ProductTag}]
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    console.log(err,"ERROR")
    res.status(500).json(err);
  }
});



// create new product
router.post('/', async(req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    try {
      const productData = await Product.create(req.body);
  
      // if product tags included create product-tag relations and bulk create with ProductTag model
      // else end and return product data
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return { product_id: productData.id, tag_id };
        });
        const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
  
        res.status(200).json({ productData, productTagIds });
        return;
      }
  
      res.status(200).json(productData);
    } catch (error) {
      res.status(400).json(error);
    }
  });


  router.put("/:id", async(req, res) => {
    // update product data
    try {
      const productData = await Product.update(req.body, {
        where: { id: req.params.id },
      });
  
      if (!productData) {
        res.status(404).json({ message: `No tag found for this id` });
        return;
      }
      res.status(200).json(tagData);
    } catch (error) {
      res.status(400).json(error);
    }
  });



router.delete('/:id', async(req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
