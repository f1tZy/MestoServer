const cardModel = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;// индетификатор пользовотеля

  cardModel.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Невозможно создать карточку. ${err}` }));
};

module.exports.getAllCards = (req, res) => {
  cardModel.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Невозможно найти карточки' }));
};

module.exports.deleteCard = (req, res) => {
  cardModel.findByIdAndRemove(req.params.id)
    .then((card) => (card !== null ? res.status(200).send({ data: card }) : res.status(404).send({ data: 'Невозможно удалить, карточка с таким ID не найдена' })))
    .catch(() => res.status(500).send({ message: 'Невозможно удалить карточку' }));
};
