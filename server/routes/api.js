const express = require('express');

const cardListController = require('../controller/cardListController');

const router = express.Router();

router.get('/', cardListController.getAllCards, (req, res) =>
 res.status(200).json(res.locals.cards)
);

router.post('/add', cardListController.addCard, (req, res) =>
  res.status(200).json('SUCCESS!')
);

module.exports = router;