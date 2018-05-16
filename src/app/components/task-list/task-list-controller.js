export function TaskListController(taskListModel, taskListView) {
  this.taskListModel = taskListModel;
  this.taskListView = taskListView;
  this.openedTaskId = null;

  this.setRemoveBtnHandler();
  this.setFilterHandler();
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
  document.getElementById('remove-mode').addEventListener('click', function() {
    console.log('asd')
  });
}

TaskListController.prototype.setFilterHandler = function() {
  var _this = this;
  document.getElementsByClassName('page')[0].addEventListener('click', function(e) {
    if(e.target.classList.contains('tasks-filter-btn')) {
      var priority = e.target.getAttribute('data-tasks-filter');
      _this.taskListView.filterTasksByPriority(priority);
    }
  });
}
