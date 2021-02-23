export default class Card {
  constructor(props){
    this._card = props.card;
    this._cardSelector = props.cardSelector;
    this._initializeShowPopup = props.initializeShowPopup;
  }

  _handleLike = event => {
    event.target.classList.toggle('element__caption-like_active');
  }

  _handleDelete = event => {
    event.target.closest('.element').remove();
  }

  _handleOpenPopup = () => {
    this._initializeShowPopup(this._card.link, this._card.name)
  }

  _setEventListeners(){
    this._element.querySelector('.element__caption-like').addEventListener('click', this._handleLike);
    this._element.querySelector('.element__delete-button').addEventListener('click', this._handleDelete);
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
    
    this._setEventListeners();

    return this._element;
  }
}