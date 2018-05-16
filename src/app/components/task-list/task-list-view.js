export function TaskListView() {
  this.templates = {
    dailyListTemplate: require('./task-list-daily.hbs'), 
    globalListTemplate: require('./task-list-global.hbs'),
    doneTasksTemplate: require('./task-list-done.hbs')
  };
}

TaskListView.prototype.renderDailyTaskList = function(tasks) {
  var container = document.getElementsByClassName('today-task')[0];
  container.innerHTML = this.templates.dailyListTemplate(tasks);
};

TaskListView.prototype.renderGlobalTaskList = function(tasks) {
  var container = document.getElementsByClassName('global-list')[0];
  container.innerHTML = this.templates.globalListTemplate(tasks);
};

TaskListView.prototype.renderDoneTaskList = function(tasks) {
  var container = document.getElementsByClassName('done-tasks')[0];
  container.innerHTML = this.templates.doneTasksTemplate(tasks);
}