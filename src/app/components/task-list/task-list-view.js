export class TaskListView {
  constructor() {
    this.currentPriorityButton = 'all';
    this.removeCount = document.getElementById('tasks-remove-count');
    this.globalListToggler = null;

    this.templates = {
      dailyListTemplate: require('./task-list-daily.hbs'),
      globalListTemplate: require('./task-list-global.hbs'),
      doneTasksTemplate: require('./task-list-done.hbs')
    };
  }

  renderDailyTaskList(tasks) {
    let container = document.getElementsByClassName('today-task')[0];
    container.innerHTML = this.templates.dailyListTemplate(tasks);
  }

  renderGlobalTaskList(tasks) {
    this.globalList = document.getElementById('global-list-container');
    this.globalList.innerHTML = this.templates.globalListTemplate(tasks);
    this.globalListToggler = document.getElementById('global-list-toggler');
  }

  renderDoneTaskList(tasks) {
    let container = document.getElementsByClassName('done-tasks')[0];
    container.innerHTML = this.templates.doneTasksTemplate(tasks);

  }

  filterTasksByPriority(priority) {
    this.changeCurrentPriorityButton(priority);
    let globalListContainer = document.getElementsByClassName('global-list')[0];
    let lists = globalListContainer.getElementsByClassName('task-list');
    if (priority === 'all') {
      for (let i = 0; i < lists.length; i++) {
        let taskCards = lists[i].getElementsByClassName('task-card');
        lists[i].classList.remove('hidden');
        for (let j = 0; j < taskCards.length; j++) {
          taskCards[j].classList.remove('hidden');
        }
      }
      return;
    }

    for (let i = 0; i < lists.length; i++) {
      let hidden = 0;
      let taskCards = lists[i].getElementsByClassName('task-card');
      for (let j = 0; j < taskCards.length; j++) {
        if (!taskCards[j].classList.contains('task-card--' + priority + '-priority')) {
          taskCards[j].classList.add('hidden');
          hidden++;
          if (hidden === taskCards.length) {
            lists[i].classList.add('hidden');
          }
        } else {
          lists[i].classList.remove('hidden');
          taskCards[j].classList.remove('hidden');
        }
      }
    }
  }

  removeCountOff() {
    this.removeCount.classList.add('hidden');
  };

  removeCountOn() {
    this.removeCount.classList.remove('hidden');
  }

  updateRemoveCount(value) {
    this.removeCount.textContent = value;
  }

  toggleRemoveAll() {
    let tabsContainer = document.getElementById('delete-all-tabs');
    tabsContainer.classList.toggle('hidden');
  }

  changeCurrentPriorityButton(priority) {
    document.getElementById(this.currentPriorityButton + '-filter').classList.remove('tabs__btn--current');
    this.currentPriorityButton = priority;
    document.getElementById(this.currentPriorityButton + '-filter').classList.add('tabs__btn--current');
  }

  showRemoveTaskButtons() {
    let taskCards = document.getElementsByClassName('task-card');
    for (let i of taskCards) {
      i.style.border = 'none'
      i.getElementsByClassName('task-card__delete-indicator')[0].style.display = 'inline-block';
      i.getElementsByClassName('task-card__date')[0].style.display = 'none';
    }
  }

  hideRemoveTaskButtons() {
    let taskCards = document.getElementsByClassName('task-card');
    for (let i of taskCards) {
      i.style.border = '';
      let deleteIndicator = i.getElementsByClassName('task-card__delete-indicator')[0];
      deleteIndicator.style.display = 'none';
      deleteIndicator.classList.remove('task-card__delete-indicator--active');
      i.getElementsByClassName('task-card__date')[0].style.display = 'inline-block';
    }
  }

  toggleGlobalList() {
    this.globalListToggler.classList.toggle('task-list-screen__global-list-toggler--on');
    let globalList = document.getElementById('global-list');
    globalList.classList.toggle('hidden');
  }

  update(data) {
    try {
      this.renderGlobalTaskList(data);
      this.renderDailyTaskList(data);
    } catch(e) {
      try {
        this.renderDoneTaskList(data);
      } catch (e) {
        console.log(e);
      }
    }

  }
}
