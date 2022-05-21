const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
    
      include: [{ model: Tag, through: Product, as: 'product_tag' }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => {

    if (req.body.tagIds.length) {
      const TagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          tag_id: product.id,
          tag_id,
        };
      });
      return Tag.bulkCreate(TagIdArr);
    }
    // if no  tags, just respond
    res.status(200).json(tag);
  })
  .then((productTagIds) => res.status(200).json(Tag))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});




router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
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
