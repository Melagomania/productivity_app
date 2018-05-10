import {firebase} from './../../app';
console.log(firebase);

export function ModalController(modalView) {
  var _this = this;
  this.modalView = modalView;

  this.setButtonListeners();
}

ModalController.prototype.setButtonListeners = function () {
  var _this = this;
  document.getElementsByClassName('page')[0].addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('modal-button')) {
      var buttonAction = target.dataset.modalAction;
      var templateContext;

      switch (buttonAction) {
        case 'modal-add':
          templateContext = { title: 'Add task', removeBtn: false }
          _this.modalView.openModal(templateContext);
          break;
        case 'modal-close':
          _this.modalView.closeModal();
          break;
        case 'modal-confirm':
          var taskInfo = _this.getInputsInfo();
          firebase.addTask(taskInfo);``
          _this.modalView.closeModal();
          break;
        case 'modal-edit':
          templateContext = { title: 'Add task', removeBtn: true }
          _this.modalView.openModal(templateContext);
          break;
      }
    } else if (target.classList.contains('screen-tint')) {
      _this.modalView.closeModal();

    }
  })
};

ModalController.prototype.getInputsInfo = function() {
  var taskOptions = {};
  var taskTitleField = document.getElementsByName('task-title')[0];
  var taskDeskriptionField = document.getElementsByName('task-description')[0];
  var taskDeadlineField = document.getElementsByName('task-deadline')[0];
  var categoryBtns = document.getElementsByName('task-category');
  var priorityBtns = document.getElementsByName('task-priority');
  var estimationBtns = document.getElementsByName('task-estimation');

  var now = new Date();

  taskOptions.title = taskTitleField.value;
  taskOptions.description = taskDeskriptionField.value;
  taskOptions.deadline = taskDeadlineField.value;
  taskOptions.isActive = false;
  taskOptions.isInProgress = false;
  taskOptions.startDate = null;
  taskOptions.estimationUsed = 0;
  taskOptions.estimation = getValue(estimationBtns);
  taskOptions.createDate = now.getTime();
  taskOptions.categoryId = getValue(categoryBtns);
  taskOptions.priority = getValue(priorityBtns);

  function getValue(inputs) {
    for(var i of inputs) {
      if(i.checked) {
        return i.value;
      }
    }
  }
  return taskOptions;
  
} 
