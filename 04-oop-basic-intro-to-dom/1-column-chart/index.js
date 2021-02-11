export default class ColumnChart {
  constructor({data = [], label, value, link, chartHeight = 50} = {}) {

    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.chartHeight = chartHeight;

    this.render();
    this.initEventListeners();
  }

  render() {
    const element = document.createElement('div');
    let innerHtml = '';

    if (this.data.length > 0) innerHtml += `<div class="column-chart" style="--chart-height: ${this.chartHeight}">`;
    else innerHtml += `<div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">`;

    innerHtml += `
      <div class="column-chart__title">
        Total ${this.label}`;

    if (this.link) innerHtml += `
              <a href="${this.link}" class="column-chart__link">View all</a>`;

    innerHtml += `
    </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.value}</div>
        <div data-element="body" class="column-chart__chart">`;

    innerHtml += this.getDataRows(this.data);

    innerHtml += `
        </div>
      </div>
    </div>`;

    element.innerHTML = innerHtml;
    this.element = element.firstElementChild;
  }

  update(data) {
    if (data.length > 0) {
      let chartBodyElement = document.querySelector('.column-chart__chart');
      chartBodyElement.innerHTML = this.getDataRows(data);
    } else {
      let chartElement = document.querySelector('.column-chart');
      chartElement.classList.add('column-chart_loading');
    }
  }

  getDataRows(data) {
    const maxData = Math.max.apply(null, data);
    let charDataHtml = '';

    for (let dataItem of data) {
      charDataHtml += `
        <div style="--value: ${Math.floor(dataItem / maxData * this.chartHeight)}" data-tooltip="${(dataItem * 100 / maxData).toFixed(0)}%"></div>`;
    }
    return charDataHtml;
  }

  initEventListeners() {
    // NOTE: в данном методе добавляем обработчики событий, если они есть
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

