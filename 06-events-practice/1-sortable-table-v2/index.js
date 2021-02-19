export default class SortableTable {
  sortTypes = {};
  subElements = {};

  constructor(header = [], dataObject = {},
              sortedColumn = header.find((item) => item.sortable).id,
              defaultOrder = "asc") {
    this.header = header;
    this.dataObject = dataObject;
    this.sortedColumn = sortedColumn;
    this.defaultOrder = defaultOrder;

    this.render();
    this.initEventListeners();
  }

  onClick =
    event => {
      const orderChange = order => {
        const orders = {
          asc: "desc",
          desc: "asc",
        }

        return orders[order];
      }

      const column = event.target.closest('[data-sortable="true"]');

      if (column) {
        const newOrder = orderChange(column.dataset.order);
        column.dataset.order = newOrder;
        if (!column.querySelector('.sortable-table__sort-arrow')) {
          column.append(this.subElements.arrow);
        }
        this.sort(column.dataset.id, newOrder);
      }
    };


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
    this.sort(this.sortedColumn, this.defaultOrder)
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
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="asc">
        <span>${item.title}</span>
        ${this.getArrow(item.id)}
      </div>`;
      }
    ).join('');
  }

  getArrow(id) {
    const isOrderExist = this.sortedColumn === id ? this.defaultOrder : '';
    return isOrderExist
      ? `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`
      : '';
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
    const order = {
      asc: 1,
      desc: -1,
    }

    let sortedObj = this.dataObject.data.slice();

    if (sortType === 'string') {
      sortedObj.sort((a, b) =>
        order[orderValue] * a[fieldValue].localeCompare(b[fieldValue], 'ru-u-kf-upper'));
    } else if (sortType === 'number') {
      sortedObj.sort((a, b) => order[orderValue] * (a[fieldValue] - b[fieldValue]));
    }

    this.subElements.body.innerHTML = this.getTable(sortedObj);
  }

  initEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.onClick);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

