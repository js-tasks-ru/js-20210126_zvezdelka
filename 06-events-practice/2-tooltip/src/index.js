class Tooltip {
  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    Tooltip.instance = this;
  }

  render(text) {
    const element = document.createElement('div');
    element.innerHTML = `
       <div class="tooltip">${text}</div>
    `;
    this.element = element.firstElementChild;
    document.body.append(this.element);
  }

  onPointOver = event => {
    if (event.target.dataset.tooltip != undefined) {
      this.render(event.target.dataset.tooltip);
      document.addEventListener(`pointermove`, this.onPointMove);
    }
  }

  onPointOut = () => {
    if (this.element) {
      this.element.remove();
      document.removeEventListener(`pointermove`, this.onPointMove);
    }
  }

  onPointMove = event => {
    const shift = 5;
    this.element.style.top = shift + event.clientY + 'px';
    this.element.style.left = shift + event.clientX + 'px';
  }

  initEventListeners() {
    document.addEventListener(`pointerover`, this.onPointOver);
    document.addEventListener(`pointerout`, this.onPointOut);
  }

  initialize() {
    this.initEventListeners();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    document.removeEventListener(`pointerover`, this.onPointOver);
    document.removeEventListener(`pointerout`, this.onPointOut);
    this.remove();
  }
}

const tooltip = new Tooltip();

export default tooltip;
