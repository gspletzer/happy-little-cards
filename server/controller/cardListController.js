const Card = require('../models/cardModel');

const cardListController = {};

cardListController.getAllCards = (req, res, next) => {
  Card.find({}, (err, cards) => {
    if (err) return next('Error in cardController.getAllCards: ' +JSON.stringify(err));
    res.locals.cards = cards;
    return next()
  });
};

cardListController.addCard = (req, res, next) => {
   const {title, image, count, keywords} = req.body;
  Card.create({title, image, count, keywords})
    .then (card => {
      res.locals.card = card;
      console.log(res.locals.card);
      return next()
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('Adding new card failed.')
    })
}

module.exports = cardListController;