export function ModalController(modalView) {
  this.modalView = modalView;
  this.isOpened = false;
  this.currentTaskId = null;
}

ModalController.prototype.init = function () {
  this.setButtonListeners();
};

ModalController.prototype.setButtonListeners = function () {
  let _this = this;
  let page = document.getElementsByClassName('page')[0];
  page.addEventListener('click', function (e) {
    let target = e.target;
    if (target.classList.contains('modal-button')) {
      let buttonAction = target.dataset.modalAction;
      let templateContext;
      switch (buttonAction) {
        case 'modal-open-add':
          templateContext = {
            title: 'Add task',
            removeBtn: false,
            submitBtn: 'add'
          }
          _this.openModal(templateContext);
          break;
        case 'modal-close':
          _this.closeModal();
          break;

        //choose what type of action perfom on a task
        case 'modal-add-task':
          _this.closeModal();
          break;
        case 'modal-edit-task':
          _this.closeModal();
          break;
        case 'modal-task-remove':
          templateContext = {
            removeConfirmModal: true
          };
          _this.closeModal();
          _this.openModal(templateContext);
          break;
        case 'modal-remove-tasks':
          _this.closeModal();
          break;
        case 'modal-cancel-delete':
          _this.closeModal();
          break;
      }
    } else if (target.classList.contains('screen-tint')) {
      _this.closeModal();
    }
  });
  page.addEventListener('keyup', function (e) {
    if (e.keyCode === 27 && _this.isOpened) {
      _this.closeModal();
    }
  });
};

ModalController.prototype.getInputsInfo = function () {
  let taskOptions = {};
  let taskTitleField = document.getElementsByName('task-title')[0];
  let taskDeskriptionField = document.getElementsByName('task-description')[0];
  let taskDeadlineField = document.getElementsByName('task-deadline')[0];
  let categoryBtns = document.getElementsByName('task-category');
  let priorityBtns = document.getElementsByName('task-priority');
  let estimationBtns = document.getElementsByName('task-estimation');

  taskOptions.title = taskTitleField.value;
  taskOptions.description = taskDeskriptionField.value;
  taskOptions.deadline = taskDeadlineField.value;
  taskOptions.estimation = +getValue(estimationBtns);
  taskOptions.categoryId = getValue(categoryBtns);
  taskOptions.priority = getValue(priorityBtns);

  function getValue(inputs) {
    for (let i of inputs) {
      if (i.checked) {
        return i.value;
      }
    }
  }

  return taskOptions;
};

ModalController.prototype.setInputsInfo = function (taskObj) {
  let taskTitleField = document.getElementsByName('task-title')[0];
  let taskDeskriptionField = document.getElementsByName('task-description')[0];
  let taskDeadlineField = document.getElementsByName('task-deadline')[0];
  let categoryBtns = document.getElementsByName('task-category');
  let priorityBtns = document.getElementsByName('task-priority');
  let estimationBtns = document.getElementsByName('task-estimation');

  taskTitleField.value = taskObj.title;
  taskDeskriptionField.value = taskObj.description;
  taskDeadlineField.value = taskObj.deadline;

  categoryBtns[taskObj.categoryId - 1].checked = true;
  priorityBtns[priorityBtns.length - taskObj.priority].checked = true;
  estimationBtns[taskObj.estimation - 1].checked = true;
};

ModalController.prototype.openModal = function (templateContext) {
  this.modalView.openModal(templateContext);
  this.isOpened = true;
};

ModalController.prototype.closeModal = function () {
  this.modalView.closeModal();
  this.isOpened = false;
};
