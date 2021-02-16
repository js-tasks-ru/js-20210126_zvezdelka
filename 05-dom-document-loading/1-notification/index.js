export default class NotificationMessage {
  static messages = [];

  constructor(message = 'Empty message',
              {duration = 1000, type = "success"} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = `
    <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>
  `;
    this.element = element.firstElementChild;
    NotificationMessage.messages.push(this.element);
  }

  show(targetElement=document.body) {
    if (NotificationMessage.messages.length>1){
      NotificationMessage.messages[0].remove();
      NotificationMessage.messages.shift();
    }
    targetElement.append(this.element);
    setTimeout(() => {
      this.remove()
    }, this.duration);

  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
