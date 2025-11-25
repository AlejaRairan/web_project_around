export class Section {
    constructor({ items, renderer }) {
        this._items = items;
        this._renderer = renderer;
        this._grid = document.querySelector(".grid");
       } 
    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });

    }

    addItem(element) {
        this._grid.append(element);
    }
}