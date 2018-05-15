export function TaskListModel(database) {
  this.remoteDB = database;
  this.localDB = {};

  this.sortedTasks = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {}
  }

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

  this.todayTasksAmount = 0
  this.todayTasks = {}
}

TaskListModel.prototype.addTask = function (taskData) {
  var key = firebase.database().ref('tasks').push(taskData).key;
  this.localDB[key] = taskData;
  return key;
}

TaskListModel.prototype.editTask = function (taskId, taskData) {
  firebase.database().ref('tasks/' + taskId).set(taskData);
  this.localDB[taskId] = taskData;
}

TaskListModel.prototype.removeTask = function (taskId) {
  firebase.database().ref('tasks/' + taskId).remove();
  delete this.localDB[taskId];
}

TaskListModel.prototype.calculateTodayTasksAmount = function () {
  this.todayTasksAmount = 0;
  for (var i in this.localDB) {
    if (this.localDB[i].deadline === 'today') {
      this.todayTasksAmount++;
    }
  }
}

TaskListModel.prototype.getTodayTasks = function () {
  for (var i in this.localDB) {
    if (this.localDB[i].deadline === 'today') {
      this.todayTasks[i] = this.localDB[i];
    }
  }
}

TaskListModel.prototype.sortTasksByCategories = function () {
  console.log('333');
  for(var i in this.localDB) {
    switch (this.localDB[i].categoryId) {
      case '1':
        this.sortedTasks[1][i] = this.localDB[i];
        this.sortedTasks[1].length++;
        break;
      case '2':
        this.sortedTasks[2][i] = this.localDB[i];
        this.sortedTasks[2].length++;        
        break;
      case '3':
        this.sortedTasks[3][i] = this.localDB[i];
        this.sortedTasks[3].length++;        
        break;
      case '4':
        this.sortedTasks[4][i] = this.localDB[i];
        this.sortedTasks[4].length++;
        break;
      case '5':
        this.sortedTasks[5][i] = this.localDB[i];
        this.sortedTasks[5].length++;
        break;
    }
  }
}
