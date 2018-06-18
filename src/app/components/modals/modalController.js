import {
  firebase
} from './../../app';

export function ModalController(modalView, taskListModel, taskListView) {
  this.modalView = modalView;
  this.taskListModel = taskListModel;
  this.taskListView = taskListView;

  this.isOpened = false;
  this.currentTaskId = null;

  this.setButtonListeners();
}

ModalController.prototype.setButtonListeners = function () {
  var _this = this;
  var page = document.getElementsByClassName('page')[0];
  page.addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('modal-button')) {
      var buttonAction = target.dataset.modalAction;
      var templateContext;
      switch (buttonAction) {
        case 'modal-open-add':
          templateContext = {
            title: 'Add task',
            removeBtn: false,
            submitBtn: 'add'
          }
          _this.modalView.openModal(templateContext);
          this.isOpened = true;
          break;
        case 'modal-open-edit':
          _this.currentTaskId = e.target.getAttribute('data-task-id');
          templateContext = {
            title: 'Edit task',
            removeBtn: true,
            submitBtn: 'edit',
            removeConfirmModal: false
          }
          _this.modalView.openModal(templateContext);
          _this.setInputsInfo(_this.taskListModel.localDB[_this.currentTaskId]);
          this.isOpened = true;
          break;
        case 'modal-close':
          _this.modalView.closeModal();
          this.isOpened = false;
          break;

        //choose what type of action perfom on a task
        case 'modal-add-task':
          var taskInfo = _this.getInputsInfo();
          taskInfo.isActive = false;
          taskInfo.isInProgress = false;
          taskInfo.startDate = null;
          taskInfo.estimationUsed = 0;
          var now = new Date();
          taskInfo.createDate = now.getTime();
          _this.taskListModel.addTask(taskInfo);
          _this.taskListModel.getTodayTasks();
          _this.taskListModel.sortTasksByCategories();
          _this.taskListView.renderGlobalTaskList(_this.taskListModel.sortedTasks);
          _this.taskListView.renderDailyTaskList(_this.taskListModel.todayTasks);
          _this.modalView.closeModal();
          this.isOpened = false;
          break;
        case 'modal-edit-task':
          var taskInfo = _this.getInputsInfo();

          _this.taskListModel.editTask(_this.currentTaskId, taskInfo);
          _this.modalView.closeModal();

          _this.taskListModel.getTodayTasks();
          _this.taskListModel.sortTasksByCategories();
          _this.taskListView.renderGlobalTaskList(_this.taskListModel.sortedTasks);
          _this.taskListView.renderDailyTaskList(_this.taskListModel.todayTasks);
          this.isOpened = false;
          break;
        case 'modal-task-remove':
          _this.taskListModel.tasksToDelete.push(_this.currentTaskId);
          var templateContext = {
            removeConfirmModal: true
          }
          _this.modalView.closeModal();
          _this.isOpened = false;
          _this.modalView.openModal(templateContext);
          break;
        case 'to-daily':
          if (_this.taskListModel.todayTasks.length < 5) {
            _this.currentTaskId = e.target.getAttribute('data-task-id');
            _this.taskListModel.setActive(_this.currentTaskId);
            _this.taskListModel.sortTasksByCategories();
            _this.taskListModel.getTodayTasks();
            _this.taskListView.renderGlobalTaskList(_this.taskListModel.sortedTasks);
            _this.taskListView.renderDailyTaskList(_this.taskListModel.todayTasks);
          }
          break;
        case 'modal-remove-tasks':
          var tasksToDelete = _this.taskListModel.tasksToDelete;
          _this.taskListModel.removeTasksCollection(tasksToDelete);
          _this.taskListModel.getTodayTasks();
          _this.taskListModel.sortTasksByCategories();
          _this.taskListView.renderGlobalTaskList(_this.taskListModel.sortedTasks);
          _this.taskListView.renderDailyTaskList(_this.taskListModel.todayTasks);
          _this.modalView.closeModal();
          _this.taskListView.toggleRemoveCount();
          _this.taskListModel.tasksToDelete = [];
          break;
        case 'modal-cancel-delete':
          _this.taskListView.renderGlobalTaskList(_this.taskListModel.sortedTasks);
          _this.taskListView.renderDailyTaskList(_this.taskListModel.todayTasks);
          _this.taskListModel.tasksToDelete = [];
          _this.modalView.closeModal();
          _this.taskListView.toggleRemoveCount();
      }
    } else if (target.classList.contains('screen-tint')) {
      _this.modalView.closeModal();
    }
  });
  page.addEventListener('keyup', function (e) {
    if (e.keyCode === 27 && this.isOpened) {
      _this.modalView.closeModal();
      this.isOpened = false;
    }
  })
};

ModalController.prototype.getInputsInfo = function () {
  var taskOptions = {};
  var taskTitleField = document.getElementsByName('task-title')[0];
  var taskDeskriptionField = document.getElementsByName('task-description')[0];
  var taskDeadlineField = document.getElementsByName('task-deadline')[0];
  var categoryBtns = document.getElementsByName('task-category');
  var priorityBtns = document.getElementsByName('task-priority');
  var estimationBtns = document.getElementsByName('task-estimation');

  taskOptions.title = taskTitleField.value;
  taskOptions.description = taskDeskriptionField.value;
  taskOptions.deadline = taskDeadlineField.value;
  taskOptions.estimation = getValue(estimationBtns);
  taskOptions.categoryId = getValue(categoryBtns);
  taskOptions.priority = getValue(priorityBtns);

  function getValue(inputs) {
    for (var i of inputs) {
      if (i.checked) {
        return i.value;
      }
    }
  }

  return taskOptions;
}

ModalController.prototype.setInputsInfo = function (taskObj) {
  var taskTitleField = document.getElementsByName('task-title')[0];
  var taskDeskriptionField = document.getElementsByName('task-description')[0];
  var taskDeadlineField = document.getElementsByName('task-deadline')[0];
  var categoryBtns = document.getElementsByName('task-category');
  var priorityBtns = document.getElementsByName('task-priority');
  var estimationBtns = document.getElementsByName('task-estimation');

  taskTitleField.value = taskObj.title;
  taskDeskriptionField.value = taskObj.description;
  taskDeadlineField.value = taskObj.deadline;

  categoryBtns[taskObj.categoryId - 1].checked = true;
  priorityBtns[priorityBtns.length - taskObj.priority].checked = true;
  estimationBtns[taskObj.estimation - 1].checked = true;
}
