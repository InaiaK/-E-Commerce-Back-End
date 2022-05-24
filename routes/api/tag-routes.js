const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
    
      include: [{ model: Product, through: ProductTag}]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    console.log(err,"ERROR")
    res.status(500).json(err);
  }
});



router.post('/', async(req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => {

    
      // if no  tags, just respond
    res.status(200).json(tag);
  })
  .then((productTagIds) => res.status(200).json(Tag))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});






  router.put("/:id", async (req, res) => {
    try {
      const tagData = await Tag.update(req.body, {
        where: { id: req.params.id },
      });
  
      if (!tagData[0]) {
        res.status(404).json({ message: `No tag found for this id` });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (error) {
      res.status(400).json(error);
    }
  });
  

  


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagtData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
