export function TaskListView() {
  this.currentPriorityButton = 'all';

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
  this.filterTasksByPriority(this.currentPriorityButton);
};

TaskListView.prototype.renderDoneTaskList = function(tasks) {
  var container = document.getElementsByClassName('done-tasks')[0];
  container.innerHTML = this.templates.doneTasksTemplate(tasks);
}

TaskListView.prototype.filterTasksByPriority = function(priority) {
  this.changeCurrentPriorityButton(priority);
  var globalListContainer = document.getElementsByClassName('global-list')[0];
  var lists = globalListContainer.getElementsByClassName('task-list');
  if(priority === 'all') {
    for(var i = 0; i < lists.length; i++) {
      var taskCards = lists[i].getElementsByClassName('task-card');  
      lists[i].classList.remove('hidden');  
      for(var j = 0; j < taskCards.length; j++) {     
          taskCards[j].classList.remove('hidden');
      }
    }
    return;
  }

  for(var i = 0; i < lists.length; i++) {
    var hidden = 0;
    var taskCards = lists[i].getElementsByClassName('task-card');    
    for(var j = 0; j < taskCards.length; j++) {
      if(!taskCards[j].classList.contains('task-card--' + priority + '-priority')) {
        taskCards[j].classList.add('hidden');
        hidden++;
        if(hidden === taskCards.length) {
          lists[i].classList.add('hidden');
        }
      } else {
        lists[i].classList.remove('hidden');
        taskCards[j].classList.remove('hidden');
      }
    }
  }
}

TaskListView.prototype.changeCurrentPriorityButton = function(priority) {
  document.getElementById(this.currentPriorityButton + '-filter').classList.remove('tabs__btn--current');
  this.currentPriorityButton = priority;
  document.getElementById(this.currentPriorityButton + '-filter').classList.add('tabs__btn--current');
}