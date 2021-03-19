export default class Card {
  constructor({card, cardSelector}, 
    openPopup = () => {}, 
    { likeCard = () => {}, deleteCard = () => {}, },
    { openConfirm = () => {},
      closeConfirm = () => {},
      setConfirmSubmit = () => {}}){
    this._card = card;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
    this._likeCard = likeCard;
    this._deleteCard = deleteCard;
    this._openConfirm = openConfirm;
    this._closeConfirm = closeConfirm;
    this._setConfirmSubmit = setConfirmSubmit;
  }

  // likeCard(cardId, isLiked)
  _handleLike = event => {
    const isLiked = event.target.classList.contains('element__caption-like_active')
    this._likeCard(this._card._id, isLiked)
      .then(card => {
        this._captionLikeCount.textContent = card.likes ? card.likes.length : 0;   
        event.target.classList.toggle('element__caption-like_active');
      })
      .catch(err => console.log('Ошибка: ' + err))
  }

  _handleDelete = event => {
    this._deleteCard(this._card._id)
      .then(card => {
        event.target.closest('.element').remove();
        this._closeConfirm()
      })
      .catch(err => console.log('Ошибка: ' + err))
  }

  _handleOpenPopup = () => this._openPopup(this._card.link, this._card.name);

  setBtnStatus = (selector, statusClass) => {
    this._element.querySelector(selector).classList.add(statusClass);
  }

  _setEventListeners(){
    this._element.querySelector('.element__caption-like').addEventListener('click', this._handleLike);
    // this._element.querySelector('.element__delete-button').addEventListener('click', this._handleDelete);
    this._element.querySelector('.element__delete-button').addEventListener('click', event => {
      this._openConfirm();
      this._setConfirmSubmit((evt) => {
        evt.preventDefault();
        this._handleDelete(event);
      });
    });
    this._picture.addEventListener('click', this._handleOpenPopup);
  }

  _getTemplate(){
    return document.querySelector(this._cardSelector).content.cloneNode(true);
  }

  generate() {
    this._element = this._getTemplate();
    this._picture = this._element.querySelector('.element__picture');
    this._picture.src = this._card.link;
    this._picture.alt = `Фото: ${this._card.name}`;
    this._element.querySelector('.element__caption-text').textContent = this._card.name;

    this._captionLikeCount = this._element.querySelector('.element__caption-like-count');
    this._captionLikeCount.textContent = this._card.likes ? this._card.likes.length : 0;
    
    this._setEventListeners();

    return this._element;
  }
}