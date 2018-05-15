export function TaskListController(taskListModel, taskListView) {
  this.taskListModel = taskListModel;
  this.taskListView = taskListView;

  // this.init();
}

TaskListController.prototype.init = function() {
  var _this = this;
  var ref = firebase.database().ref(`tasks`);
  ref.on('value', function(snapshot) {
    _this.taskListModel.localDB = snapshot.val();
    _this.taskListModel.calculateTodayTasksAmount();
    _this.taskListModel.getTodayTasks();
    _this.taskListModel.sortTasksByCategories();   
  });
} 