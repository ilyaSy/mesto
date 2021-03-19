export default class Section {
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _clear = () => {this._container.innerHTML = ''}

  renderItems(items){
    this._clear();
    items.length ?
      items.forEach(element => { this._renderer(element) }) :
      this._container.textContent = 'Нет фотографий'
  }

  addItem(element){
    this._container.prepend(element);
  }
}