export default class SortableTable {
  sortTypes = {};

  constructor(header = [], dataObject = {}) {
    this.header = header;
    this.dataObject = dataObject;

    this.render();

  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = `
    <div class="sortable-table">
      <div data-element="header" class="sortable-table__header sortable-table__row">
          ${this.getHeader()}
      </div>
      <div data-element="body" class="sortable-table__body">
          ${this.getTable(this.dataObject.data)}
      </div>
    </div>
    `;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  getHeader() {
    return this.header.map((item) => {
        item.sortable && (this.sortTypes[item.id] = item.sortType);
        return `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
        <span>${item.title}</span>
      </div>`;
      }
    ).join('');
  }

  getTable(data) {
    return data.map((dataItem) => {
      return `<a href="/products/${dataItem.id}" class="sortable-table__row">` +
        this.header.map((headerItem) =>
          headerItem.template ? headerItem.template(dataItem.images) :
            `<div class="sortable-table__cell">${dataItem[headerItem.id]}</div>`
        ).join('') + `</a>`
    }).join('');
  }

  sort(fieldValue, orderValue) {
    const sortType = this.sortTypes[fieldValue];

    let sortedObj = {};
    let order = 0;

    if (orderValue == 'asc') {
      order = 1;
    } else if (orderValue == 'desc') {
      order = -1;
    }

    if (sortType === 'string') {
      sortedObj = this.dataObject.data.slice().sort((a, b) =>
        order * a[fieldValue].localeCompare(b[fieldValue], 'ru-u-kf-upper'));
    } else if (sortType === 'number') {
      sortedObj = this.dataObject.data.slice().sort((a, b) => order * (a[fieldValue] - b[fieldValue]));
    }

    this.subElements.body.innerHTML = this.getTable(sortedObj);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

