export default class Section {
  // constructor({items, renderer}, containerSelector){
  constructor({renderer}, containerSelector){
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _clear(){
    this._container.innerHTML = '';
  }

  renderItems(items){
    this._clear();
    items.forEach(element => { this._renderer(element) });
    // this._items.forEach(element => { this._renderer(element) });
  }

  addItem(element){
    this._container.prepend(element);
  }
}