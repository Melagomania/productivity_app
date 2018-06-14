export function ModalView() {
  this.modalTemplate = require('./modals.hbs');
}

ModalView.prototype.openModal = function(context) {
  document.getElementsByClassName('modal-wrapper')[0].innerHTML  += this.modalTemplate(context);
}

ModalView.prototype.closeModal = function() {
  var screenTint = document.getElementsByClassName('screen-tint')[0];
  var modalWin = document.getElementsByClassName('modal-win')[0];
  modalWin.parentElement.removeChild(modalWin);
  screenTint.parentElement.removeChild(screenTint);
}
