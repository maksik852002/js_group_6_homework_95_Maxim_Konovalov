const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const upload = require('../multer').uploads;

const Coctail = require('../models/Coctail');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const coctails = await Coctail.find().populate('user', ['token', 'role']);
    return res.send(coctails);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const coctail = await Coctail.findById(req.params.id);
    if (!coctail) {
      return res.status(404).send({message: 'Not found'});
    };
    return res.send(coctail);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const data = {
      user: req.user._id,
      name: req.body.name,
      recipe: req.body.recipe,
      ingredients: JSON.parse(req.body.ingredients),
    };
    if (req.body.rating) {
      data.rating = req.body.rating
    };
    if (req.file) {
      data.image = req.file.filename;
    };

    const coctail = new Coctail(data);
    await coctail.save();
    return res.send({id: coctail._id});

  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send(e);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const coctail = await Coctail.findById(req.params.id)

    if (!coctail) {
      return res.status(404).send({message: 'Not found'});
    };
    
    const index = coctail.rating.findIndex(el => el.user === req.user._id.toString())
    if (index === -1) {
      coctail.rating.push(req.body)
    } else {
      coctail.rating[index].score = req.body.score
    }
    await Coctail.updateOne({_id: req.params.id}, coctail);
    return res.send({message: coctail._id + ' Successfully changed'});
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send(e);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.patch("/:id/publish", [auth, permit('admin')], async (req, res) => {
  try {
    const coctail = await Coctail.findById(req.params.id);
    coctail.published = !coctail.published
    await coctail.save();
    return res.send({ message: `${req.params.id} published` });
  } catch (e) {
    return res.status(422).send(e);
  }
}); 

router.delete("/:id", [auth, permit('admin')], async (req, res) => {
  try {
    await Coctail.findOneAndRemove({_id: req.params.id});
    return res.send({ message: `${req.params.id} removed` });
  } catch (e) {
    return res.status(422).send(e);
  }
});


module.exports = router;