export default class Card {
  constructor(props){
    this._card = props.card;
    this._cardSelector = props.cardSelector;

    this._popupShow = document.querySelector('.popup_type_show');
    this._popupShowCloseBtn = this._popupShow.querySelector('.popup__close-button');

    this._openPopup = props.openPopup;
    this._closePopup = props.closePopup;
    this._closeByClickOnOverlay = props.closeByClickOnOverlay;
  }

  _handleLike = event => {
    event.target.classList.toggle('element__caption-like_active');
  }

  _handleDelete = event => {
    event.target.closest('.element').remove();
  }

  _handleOpenPopup = () => {
    this._openPopup(this._popupShow);
    this._initializeShowPopup(this._card.link, this._card.name)
  }

  _handleClosePopup = () => {
    this._closePopup(this._popupShow);
  }

  _initializeShowPopup(src, name) {
    const picturePopup = this._popupShow.querySelector('.popup__picture');
    picturePopup.src = src;
    picturePopup.alt = `Фото: ${name}`;
    this._popupShow.querySelector('.popup__caption').textContent = name;
  }

  _setEventListeners(){
    this._element.querySelector('.element__caption-like').addEventListener('click', this._handleLike);
    this._element.querySelector('.element__delete-button').addEventListener('click', this._handleDelete);
    this._picture.addEventListener('click', this._handleOpenPopup);
    this._popupShowCloseBtn.addEventListener('click', this._handleClosePopup);
    this._popupShow.addEventListener('click', this._closeByClickOnOverlay.bind(this));
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
  
  //add element to section: elements
  // const addElement = element => {
  //   elements.prepend(element);
  // }
}