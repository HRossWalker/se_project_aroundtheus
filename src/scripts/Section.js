class Section {
  constructor({ data, renderer }, container) {
    this._items = data;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
