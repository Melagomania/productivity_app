export function TaskListController(taskListModel, taskListView) {
  this.taskListModel = taskListModel;
  this.taskListView = taskListView;
  this.openedTaskId = null;

  this.setRemoveBtnHandler();
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
