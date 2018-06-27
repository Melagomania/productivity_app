export class ModalView {
  constructor() {
    this.modalTemplate = require('./modals.hbs');
  }

  openModal(context) {
    document.getElementsByClassName('modal-wrapper')[0].innerHTML += this.modalTemplate(context);
  }

  closeModal() {
    let screenTint = document.getElementsByClassName('screen-tint')[0];
    let modalWin = document.getElementsByClassName('modal-win')[0];
    modalWin.parentElement.removeChild(modalWin);
    screenTint.parentElement.removeChild(screenTint);
  }

  //todo: add setInputsData method
}
