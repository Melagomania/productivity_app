export function PageView() {
  this.screenContainer = document.getElementsByClassName('screen-container')[0];
  this.headerHeading = document.getElementsByClassName('screen-heading--mobile')[0];
  this.headerAddBtn = document.getElementsByClassName('task-list-screen__add-btn--header')[0];

  this.taskListOnlyBtns = document.getElementsByClassName('task-list-only');
  this.screenTemplates = {
    'welcome': require('./../../pages/first-visit/first-visit.hbs'),
    'settings': require('./../../pages/settings/settings.hbs'),
    'settings-categories': require('./../../pages/settings/settings-categories.hbs'),
    'timer': require('./../../pages/timer/timer.hbs'),
    'task-list': require('./../../pages/tasks-list/task-list.hbs'),
    'task-list-done': require('./../../pages/tasks-list/task-list-done.hbs'),
    'reports': require('./../../pages/reports/reports.hbs')
  }

  this.screenTitles = {
    'settings': 'Settings',
    'settings-categories': 'Settings',
    'timer': 'Timer',
    'task-list': 'Task List',
    'task-list-done': 'Task List',
    'reports': 'Reports'
  }
}

PageView.prototype.renderScreen = function(screen) {
  this.screenContainer.innerHTML = this.screenTemplates[screen]();
  this.headerHeading.innerHTML = this.screenTitles[screen];
  if(screen === 'task-list' || screen === 'task-list-done') {
    this.headerAddBtn.style.display = 'inline-block';
    for(let i of this.taskListOnlyBtns) {
      i.style.display = 'block';
    }
  } else {
    this.headerAddBtn.style.display = 'none';
    for(let i of this.taskListOnlyBtns) {
      i.style.display = 'none';
    }
  }
};

PageView.prototype.update = function (data) {
  try {
    this.renderScreen(data.currentScreen);
  } catch(e) {
    console.log('333');
  }
};
