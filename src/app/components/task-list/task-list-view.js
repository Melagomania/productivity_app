export function TaskListView() {
  this.currentPriorityButton = 'all';
  this.removeCount = document.getElementById('tasks-remove-count');

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
  var container = document.getElementById('global-list-container');
  container.innerHTML = this.templates.globalListTemplate(tasks);
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

TaskListView.prototype.toggleRemoveCount = function() {
  this.removeCount.classList.toggle('hidden');
};

TaskListView.prototype.updateRemoveCount = function(value) {
  this.removeCount.textContent = value;
};

TaskListView.prototype.changeCurrentPriorityButton = function(priority) {
  document.getElementById(this.currentPriorityButton + '-filter').classList.remove('tabs__btn--current');
  this.currentPriorityButton = priority;
  document.getElementById(this.currentPriorityButton + '-filter').classList.add('tabs__btn--current');
};

TaskListView.prototype.showRemoveTaskButtons = function() {
  var taskCards = document.getElementsByClassName('task-card');
  for(let i of taskCards) {
    i.style.border = 'none'
    i.getElementsByClassName('task-card__delete-indicator')[0].style.display = 'inline-block';
    i.getElementsByClassName('task-card__date')[0].style.display = 'none';
  }
};

TaskListView.prototype.hideRemoveTaskButtons = function() {
  var taskCards = document.getElementsByClassName('task-card');
  for(let i of taskCards) {
    i.style.border = '';
    i.getElementsByClassName('task-card__delete-indicator')[0].style.display = 'none';
    i.getElementsByClassName('task-card__date')[0].style.display = 'inline-block';
  }
};

TaskListView.prototype.update = function (data) {
  this.renderGlobalTaskList(data);
  this.renderDailyTaskList(data);
};
