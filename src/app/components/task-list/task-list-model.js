export class TaskListModel {
  constructor() {
    this.firstTaskAdded = sessionStorage.getItem('firstTaskAdded');
    this.localDB = null;

    this.undoneTasks = 0;
    this.tasksToDelete = [];
    this.todayTasks = {};
    this.doneTasks = {};
    this.sortedTasks = {
      1: {},
      2: {},
      3: {},
      4: {},
      5: {}
    };

    Object.defineProperty(this.todayTasks, 'length', {
      enumerable: false,
      writable: true,
      value: 0
    });

    Object.defineProperty(this.sortedTasks[1], 'length', {
      enumerable: false,
      writable: true,
      value: 0
    });

    Object.defineProperty(this.sortedTasks[2], 'length', {
      enumerable: false,
      writable: true,
      value: 0
    });

    Object.defineProperty(this.sortedTasks[3], 'length', {
      enumerable: false,
      writable: true,
      value: 0
    });

    Object.defineProperty(this.sortedTasks[4], 'length', {
      enumerable: false,
      writable: true,
      value: 0
    });

    Object.defineProperty(this.sortedTasks[5], 'length', {
      enumerable: false,
      writable: true,
      value: 0
    });


    this.observers = [];
  }

  addTask(taskData) {
    let now = new Date();
    //todo: refactor::::
    taskData.createDate = now.getTime();
    taskData.isActive = false;
    taskData.isInProgress = false;
    taskData.startDate = null;
    taskData.estimationUsed = 0;
    taskData.isDone = false;
    taskData.pomodorasCompleted = 0;

    taskData.pomodoras = [];
    for (let i = 0; i < taskData.estimation; i++) {
      taskData.pomodoras.push('');
    }

    let key = firebase.database().ref('tasks').push(taskData).key;

    this.localDB[key] = taskData;
    this.firstTaskAdded = true;

    this.getTodayTasks();
    this.sortTasksByCategories();
    this.notify(this);
    sessionStorage.setItem('firstTaskAdded', true);
    return key;
  }

  editTask(taskId, taskData) {
    firebase.database().ref('tasks/' + taskId).update(taskData);
    for (let i in taskData) {
      this.localDB[taskId][i] = taskData[i];
    }
    this.getTodayTasks();
    this.sortTasksByCategories();
    this.notify(this);
  }

  setActive(taskId) {
    this.localDB[taskId].isActive = true;
    firebase.database().ref('tasks/' + taskId).update({isActive: true});
    this.sortTasksByCategories();
    this.getTodayTasks();
    this.notify(this);
  }

  setPomodorasArr(taskId, value) {
    if (value !== 'failed') {
      this.localDB[taskId].estimationUsed++;
    }
    this.localDB[taskId].pomodorasCompleted++;
    for (let i = 0; i < this.localDB[taskId].pomodoras.length; i++) {
      if (this.localDB[taskId].pomodoras[i] === '') {
        this.localDB[taskId].pomodoras[i] = value;
        break;
      }
    }
    firebase.database().ref('tasks/' + taskId).update({
      'pomodoras': this.localDB[taskId].pomodoras,
      'estimationUsed': this.localDB[taskId].estimationUsed,
      'pomodorasCompleted': this.localDB[taskId].pomodorasCompleted
    });
  }

// todo: refactor
  setTaskDone(taskId) {
    this.localDB[taskId].isDone = true;
    firebase.database().ref('tasks/' + taskId).update({
      'isDone': true
    });
  }

  removeTasksCollection() {
    let _this = this;
    this.tasksToDelete.forEach(function (taskId) {
      delete _this.localDB[taskId];
    });
    for (const taskId of this.tasksToDelete) {
      firebase.database().ref('tasks/' + taskId).remove();
    }
    this.tasksToDelete = [];
    this.getTodayTasks();
    this.sortTasksByCategories();
    this.notify(this);
  }
  ;

  getTodayTasks() {
    this.todayTasks = {};
    Object.defineProperty(this.todayTasks, 'length', {
      enumerable: false,
      writable: true,
      value: 0
    });
    for (let i in this.localDB) {
      if (this.localDB[i].isActive && !this.isTaskDone(this.localDB[i])) {
        this.todayTasks[i] = this.localDB[i];
        this.todayTasks.length++;
      }
    }
  }

  getDoneTasks() {
    for (let i in this.localDB) {
      if (this.isTaskDone(this.localDB[i])) {
        this.doneTasks[i] = this.localDB[i];
      }
    }
  }

  sortTasksByCategories() {
    this.undoneTasks = 0;
    for (let i in this.sortedTasks) {
      this.sortedTasks[i] = {};

      this.sortedTasks[i].length = 0;
      Object.defineProperty(this.sortedTasks[i], 'length', {
        enumerable: false,
        writable: true,
        value: 0
      });
    }
    for (let i in this.localDB) {
      switch (this.localDB[i].categoryId) {
        case '1':
          if (!this.localDB[i].isActive && !this.isTaskDone(this.localDB[i])) {
            this.sortedTasks[1][i] = this.localDB[i];
            this.sortedTasks[1].length++;
            this.undoneTasks++;
            this.firstTaskAdded = true;
            sessionStorage.setItem('firstTaskAdded', true);
          }
          break;
        case '2':
          if (!this.localDB[i].isActive && !this.isTaskDone(this.localDB[i])) {
            this.sortedTasks[2][i] = this.localDB[i];
            this.sortedTasks[2].length++;
            this.undoneTasks++;
            this.firstTaskAdded = true;
            sessionStorage.setItem('firstTaskAdded', true);
          }
          break;
        case '3':
          if (!this.localDB[i].isActive && !this.isTaskDone(this.localDB[i])) {
            this.sortedTasks[3][i] = this.localDB[i];
            this.sortedTasks[3].length++;
            this.undoneTasks++;
            this.firstTaskAdded = true;
            sessionStorage.setItem('firstTaskAdded', true);
          }
          break;
        case '4':
          if (!this.localDB[i].isActive && !this.isTaskDone(this.localDB[i])) {
            this.sortedTasks[4][i] = this.localDB[i];
            this.sortedTasks[4].length++;
            this.undoneTasks++;
            this.firstTaskAdded = true;
            sessionStorage.setItem('firstTaskAdded', true);
          }
          break;
        case '5':
          if (!this.localDB[i].isActive && !this.isTaskDone(this.localDB[i])) {
            this.sortedTasks[5][i] = this.localDB[i];
            this.sortedTasks[5].length++;
            this.undoneTasks++;
            this.firstTaskAdded = true;
            sessionStorage.setItem('firstTaskAdded', true);
          }
          break;
      }
    }
  }


//todo: remove unused method
  isTaskDone(task) {
    return task.isDone;
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}



