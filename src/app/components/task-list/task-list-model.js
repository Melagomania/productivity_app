export function TaskListModel(database) {
  this.firstTaskAdded = sessionStorage.getItem('firstTaskAdded');

  this.remoteDB = database;
  this.localDB;

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


}

TaskListModel.prototype.addTask = function (taskData) {
  taskData.pomodoras = [];
  for (let i = 0; i < +taskData.estimation; i++) {
    taskData.pomodoras.push('');
  }
  var key = firebase.database().ref('tasks').push(taskData).key;
  this.localDB[key] = taskData;
  console.log(this);
  this.firstTaskAdded = true;
  sessionStorage.setItem('firstTaskAdded', true);
  return key;
};

TaskListModel.prototype.editTask = function (taskId, taskData) {
  firebase.database().ref('tasks/' + taskId).update(taskData);
  for (var i in taskData) {
    this.localDB[taskId][i] = taskData[i];
  }
};

TaskListModel.prototype.setActive = function (taskId) {
  this.localDB[taskId].isActive = true;
  firebase.database().ref('tasks/' + taskId).update({isActive: true});
};

TaskListModel.prototype.setPomodorasArr = function (taskId, value) {
  this.localDB[taskId].estimationUsed++;
  this.localDB[taskId].pomodoras[this.localDB[taskId].estimationUsed - 1] = value;
  firebase.database().ref('tasks/' + taskId).update({
    'pomodoras': this.localDB[taskId].pomodoras,
    'estimationUsed': this.localDB[taskId].estimationUsed
  });
};

// todo: refactor
TaskListModel.prototype.setTaskDone = function (taskId) {
  this.localDB[taskId].estimationUsed = this.localDB[taskId].estimation;
  firebase.database().ref('tasks/' + taskId).update({
    'estimationUsed': this.localDB[taskId].estimationUsed
  });
};


TaskListModel.prototype.setInProgress = function (taskId) {
  this.localDB[taskId].isInProgress = true;
  firebase.database().ref('tasks/' + taskId).update({isInProgress: true});
};

TaskListModel.prototype.removeTask = function (taskId) {
  delete this.localDB[taskId];
  firebase.database().ref('tasks/' + taskId).remove();
};

TaskListModel.prototype.removeTasksCollection = function (tasks) {
  var _this = this;
  tasks.forEach(function (taskId) {
    delete _this.localDB[taskId];
  });
  for (const taskId of tasks) {
    firebase.database().ref('tasks/' + taskId).remove();
  }
};

TaskListModel.prototype.getTodayTasks = function () {
  this.todayTasks = {};
  Object.defineProperty(this.todayTasks, 'length', {
    enumerable: false,
    writable: true,
    value: 0
  });
  for (var i in this.localDB) {
    if (this.localDB[i].isActive && !this.isTaskDone(this.localDB[i])) {
      this.todayTasks[i] = this.localDB[i];
      this.todayTasks.length++;
    }
  }
};

TaskListModel.prototype.getDoneTasks = function () {
  for (var i in this.localDB) {
    if (this.isTaskDone(this.localDB[i])) {
      this.doneTasks[i] = this.localDB[i];
    }
  }
};

TaskListModel.prototype.sortTasksByCategories = function () {
  this.undoneTasks = 0;
  for (var i in this.sortedTasks) {
    this.sortedTasks[i] = {};

    this.sortedTasks[i].length = 0;
    Object.defineProperty(this.sortedTasks[i], 'length', {
      enumerable: false,
      writable: true,
      value: 0
    });
  }
  for (var i in this.localDB) {
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

TaskListModel.prototype.isTaskDone = function (task) {
  return +task.estimation == task.estimationUsed;
};





