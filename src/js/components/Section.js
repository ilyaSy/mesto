export default class Section {
  constructor({items, renderer}, containerSelector){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _clear = () => {this._container.innerHTML = ''}

  renderItems(){
    this._clear();
    this._items.length ?
      this._items.forEach(element => { this._renderer(element) }) :
      this._container.textContent = 'Нет фотографий'
  }

  addItem(element){
    this._container.prepend(element);
  }
}