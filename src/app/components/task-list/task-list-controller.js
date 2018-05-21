export function TaskListController(taskListModel, taskListView, modalView) {
  this.taskListModel = taskListModel;
  this.taskListView = taskListView;
  this.modalView = modalView;
  this.openedTaskId = null;

  this.removeModeStatus = 'off';

  this.setRemoveBtnHandler();
  this.setFilterHandler();
  this.setDeleteIndicatorHandler();
}

TaskListController.prototype.init = function() {
  var _this = this;
  var ref = firebase.database().ref(`tasks`);
  ref.on('value', function(snapshot) {
    _this.taskListModel.localDB = snapshot.val(); 
    
    _this.taskListModel.sortTasksByCategories();   
    _this.taskListModel.getTodayTasks();
    _this.taskListView.renderGlobalTaskList(_this.taskListModel.sortedTasks);
    _this.taskListView.renderDailyTaskList(_this.taskListModel.todayTasks);
  });
} 

TaskListController.prototype.setRemoveBtnHandler = function() {
  var _this = this;
  document.getElementById('remove-mode').addEventListener('click', function() {
    switch (_this.removeModeStatus) {
      case 'off':
        _this.tasksToDelete = [];
        _this.taskListView.showRemoveTaskButtons();
        _this.show
        _this.removeModeStatus = 'on';
        _this.taskListView.toggleRemoveCount();
        _this.taskListView.updateRemoveCount( _this.tasksToDelete.length);        
        break;
      case 'on':
        _this.taskListView.hideRemoveTaskButtons();
        var templateContext = {
          removeConfirmModal: true
        }
        _this.modalView.openModal(templateContext);
        _this.removeModeStatus = 'off';
      default:
        break;
    }
  });
};
TaskListController.prototype.setDeleteIndicatorHandler = function() {
  var _this = this;
  document.getElementsByClassName('page')[0].addEventListener('click', function(e) {
    var target = e.target;
    if(target.classList.contains('task-card__delete-indicator')) {
      target.classList.toggle('task-card__delete-indicator--active');
      var taskId = target.getAttribute('data-task-id');
      var taskPos = _this.taskListModel.tasksToDelete.indexOf(taskId);
      if(taskPos !== -1) {
        _this.taskListModel.tasksToDelete.splice(taskPos, 1);
        _this.taskListView.updateRemoveCount(_this.taskListModel.tasksToDelete.length);
      } else {
        _this.taskListModel.tasksToDelete.push(taskId);
        _this.taskListView.updateRemoveCount(_this.taskListModel.tasksToDelete.length);        
      }
    }
  });
};

TaskListController.prototype.setFilterHandler = function() {
  var _this = this;
  document.getElementsByClassName('page')[0].addEventListener('click', function(e) {
    if(e.target.classList.contains('tasks-filter-btn')) {
      var priority = e.target.getAttribute('data-tasks-filter');
      _this.taskListView.filterTasksByPriority(priority);
    }
  });
}
