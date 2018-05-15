export function PageView() {
  this.screenContainer = document.getElementsByClassName('screen-container')[0];
  this.screenTemplates = {
    'welcome': require('./../../pages/first-visit/first-visit.hbs'),
    'settings': require('./../../pages/settings/settings.hbs'),
    'settings-categories': require('./../../pages/settings/settings-categories.hbs'),
    'timer': require('./../../pages/timer/timer.hbs'),
    'task-list': require('./../../pages/tasks-list/task-list.hbs'),
    'task-list-done': require('./../../pages/tasks-list/task-list-done.hbs'),
    'reports': require('./../../pages/reports/reports.hbs')
  }
}

PageView.prototype.renderScreen = function(screen) {
  // console.log(context);
  this.screenContainer.innerHTML = this.screenTemplates[screen]();
}