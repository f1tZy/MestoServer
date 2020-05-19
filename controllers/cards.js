const cardModel = require('../models/card');
const { ForbiddenError, NotFoundError } = require('../status_errors/index_errors');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;// индетификатор пользовотеля

  cardModel.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.getAllCards = (req, res, next) => {
  cardModel.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  cardModel.findById(req.params.id)
    .then((card) => {
      if (card === null) { throw new NotFoundError('Невозможно удалить, карточка с таким ID не найдена'); }
      if (!card.owner.equals(req.user._id)) { throw new ForbiddenError('Нет доступа для удаления карточки. Вы не создавали карточку'); }
      return cardModel.remove(card)
        .then(() => res.status(200).send({ data: card }));
    })
    .catch(next);
};
