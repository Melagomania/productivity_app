export function TaskListView() {
  this.templates = {
    globalListTemplate: require('./task-list-global.hbs')
  };
}

TaskListView.prototype.renderGlobalTaskList = function(tasks) {
  var globalTasksContainer = document.getElementsByClassName('global-list')[0];
  globalTasksContainer.innerHTML = this.templates.globalListTemplate(tasks);
}