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
    .then((card) => {
      if (card === null) return res.status(404).send({ message: 'Невозможно удалить, карточка с таким ID не найдена' });
      if (!card.owner.equals(req.user._id)) {
        return res.status(403).send({ message: 'Нет доступа для удаления карточки. Вы не создавали карточку' });
      }
      return cardModel.remove(card)
        .then(() => res.status(200).send({ data: card }));
    })
    .catch(() => res.status(500).send({ message: 'Невозможно удалить карточку' }));
};
