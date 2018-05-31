var modalTemplate = require('./modals.hbs');
export function ModalView() {

}

ModalView.prototype.openModal = function(context) {
  document.getElementsByClassName('modal-wrapper')[0].innerHTML  += modalTemplate(context);
}

ModalView.prototype.closeModal = function() {
  var modalWin = document.getElementsByClassName('modal-win')[0];
  var screenTint = document.getElementsByClassName('screen-tint')[0];

  screenTint.parentElement.removeChild(screenTint);
  modalWin.parentElement.removeChild(modalWin);
}
