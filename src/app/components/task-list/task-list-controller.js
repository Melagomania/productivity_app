export function TaskListController(taskListModel, taskListView, modalController) {
  this.taskListModel = taskListModel;
  this.taskListView = taskListView;
  this.modalController = modalController;
  this.currentTaskId = null;
  this.isDeleteMode = false;


}

TaskListController.prototype.init = function () {
  var _this = this;
  var ref = firebase.database().ref(`tasks`);
  ref.on('value', function (snapshot) {
    _this.taskListModel.localDB = snapshot.val();

    _this.taskListModel.sortTasksByCategories();
    _this.taskListModel.getTodayTasks();

    try {
      _this.taskListView.renderGlobalTaskList(_this.taskListModel);
      _this.taskListView.renderDailyTaskList(_this.taskListModel);
    } catch (e) {
      console.log('Not task list page');
    }
  });
  this.taskListModel.addObserver(this.taskListView);

  this.setRemoveBtnHandler();
  this.setFilterHandler();
  this.setDeleteIndicatorHandler();
  this.setModalEventListeners();
};

TaskListController.prototype.setRemoveBtnHandler = function () {
  var _this = this;
  document.getElementById('remove-mode').addEventListener('click', function () {
    switch (_this.isDeleteMode) {
      case false:
        _this.taskListView.showRemoveTaskButtons();
        _this.isDeleteMode = true;
        _this.taskListView.removeCountOn();
        _this.taskListView.updateRemoveCount(_this.taskListModel.tasksToDelete.length);
        break;
      case true:
        if (_this.taskListModel.tasksToDelete.length === 0) {
          _this.taskListView.hideRemoveTaskButtons();
          _this.taskListView.removeCountOff();
          _this.isDeleteMode = false;
        } else {
          let templateContext = {
            removeConfirmModal: true
          };
          _this.modalController.openModal(templateContext);
        }
        break;
      default:
        break;
    }
  });
};

TaskListController.prototype.setModalEventListeners = function () {
  let _this = this;
  let page = document.getElementsByClassName('page')[0];
  page.addEventListener('click', function (e) {
    let target = e.target;
    if (target.classList.contains('modal-button')) {
      let buttonAction = target.dataset.modalAction;
      let inputsData;
      switch (buttonAction) {
        case 'modal-open-edit':
          let templateContext = {
            title: 'Edit task',
            removeBtn: true,
            submitBtn: 'edit',
            removeConfirmModal: false
          };
          _this.modalController.openModal(templateContext);
          _this.currentTaskId = e.target.getAttribute('data-task-id');
          _this.modalController.setInputsInfo(_this.taskListModel.localDB[_this.currentTaskId]);
          break;

        case 'modal-add-task':
          inputsData = _this.modalController.getInputsInfo();
          _this.taskListModel.addTask(inputsData);
          break;
        case 'modal-edit-task':
          inputsData = _this.modalController.getInputsInfo();
          _this.taskListModel.editTask(_this.currentTaskId, inputsData);
          break;
        case 'modal-task-remove':
          _this.taskListModel.tasksToDelete = [_this.currentTaskId];
          break;
        case 'to-daily':
          if (_this.taskListModel.todayTasks.length < 5) {
            _this.currentTaskId = e.target.getAttribute('data-task-id');
            _this.taskListModel.setActive(_this.currentTaskId);
          }
          break;
        case 'modal-remove-tasks':
          _this.taskListModel.removeTasksCollection();
          _this.taskListView.removeCountOff();
          _this.taskListView.hideRemoveTaskButtons();
          _this.isDeleteMode = false;
          break;
        case 'modal-cancel-delete':
          _this.taskListModel.tasksToDelete = [];
          _this.taskListView.removeCountOff();
          _this.taskListView.hideRemoveTaskButtons();
          _this.isDeleteMode = false;
          break;
      }
    }
  });
};

TaskListController.prototype.setDeleteIndicatorHandler = function () {
  let _this = this;
  document.getElementsByClassName('page')[0].addEventListener('click', function (e) {
    let target = e.target;
    if (target.classList.contains('task-card__delete-indicator')) {
      target.classList.toggle('task-card__delete-indicator--active');
      let taskId = target.getAttribute('data-task-id');
      let taskPos = _this.taskListModel.tasksToDelete.indexOf(taskId);
      if (taskPos !== -1) {
        _this.taskListModel.tasksToDelete.splice(taskPos, 1);
        _this.taskListView.updateRemoveCount(_this.taskListModel.tasksToDelete.length);
      } else {
        _this.taskListModel.tasksToDelete.push(taskId);
        _this.taskListView.updateRemoveCount(_this.taskListModel.tasksToDelete.length);
      }
    }
  });
};

TaskListController.prototype.setFilterHandler = function () {
  let _this = this;
  document.getElementsByClassName('page')[0].addEventListener('click', function (e) {
    if (e.target.classList.contains('tasks-filter-btn')) {
      let priority = e.target.getAttribute('data-tasks-filter');
      _this.taskListView.filterTasksByPriority(priority);
    }
  });
};
