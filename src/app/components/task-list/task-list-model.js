export function TaskListModel(database) {
  this.remoteDB = database;
  this.localDB;

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
  var key = firebase.database().ref('tasks').push(taskData).key;
  this.localDB[key] = taskData;
  return key;
}

TaskListModel.prototype.editTask = function (taskId, taskData) {
  firebase.database().ref('tasks/' + taskId).update(taskData);
  for(var i in taskData) {
    this.localDB[taskId][i] = taskData[i];

  }
}

TaskListModel.prototype.setActive = function (taskId) {
  this.localDB[taskId].isActive = true;
  firebase.database().ref('tasks/' + taskId).update({isActive: true});
}

TaskListModel.prototype.removeTask = function (taskId) {
  delete this.localDB[taskId];
  firebase.database().ref('tasks/' + taskId).remove();
}

TaskListModel.prototype.getTodayTasks = function () {
  this.todayTasks.length = 0;
  
  for (var i in this.localDB) {
    if (this.localDB[i].isActive && !this.isTaskDone(this.localDB[i])) {
      this.todayTasks[i] = this.localDB[i];
      this.todayTasks.length++;
    }
  }
}

TaskListModel.prototype.getDoneTasks = function() {
  for(var i in this.localDB) {
    if(this.isTaskDone(this.localDB[i])) {
      this.doneTasks[i] = this.localDB[i];
    }
  }
}

TaskListModel.prototype.sortTasksByCategories = function () {
  for(var i in this.sortedTasks) {
    this.sortedTasks[i] = {};
    this.sortedTasks[i].length = 0;    
  
    Object.defineProperty(this.sortedTasks[i], 'length', {
      enumerable: false,
      writable: true,
      value: 0
    });
  }
  console.log('srt',this.sortedTasks);
  for(var i in this.localDB) {
    switch (this.localDB[i].categoryId) {
      case '1':
        if(!this.localDB[i].isActive && !this.isTaskDone(this.localDB[i])){
          this.sortedTasks[1][i] = this.localDB[i];
          this.sortedTasks[1].length++;
        }
        break;
      case '2':
        if(!this.localDB[i].isActive && !this.isTaskDone(this.localDB[i])){
          this.sortedTasks[2][i] = this.localDB[i];
          this.sortedTasks[2].length++;    
        }    
        break;
      case '3':
        if(!this.localDB[i].isActive && !this.isTaskDone(this.localDB[i])){
          this.sortedTasks[3][i] = this.localDB[i];
          this.sortedTasks[3].length++;        
          break;
        } 
      case '4':
        if(!this.localDB[i].isActive && !this.isTaskDone(this.localDB[i])){
          this.sortedTasks[4][i] = this.localDB[i];
          this.sortedTasks[4].length++;
          break;
        }
      case '5':
        if(!this.localDB[i].isActive && !this.isTaskDone(this.localDB[i])){
          this.sortedTasks[5][i] = this.localDB[i];
          this.sortedTasks[5].length++;
          break;
        }
    }
  }
}

TaskListModel.prototype.isTaskDone = function(task) {
  return task.estimation === task.estimationUsed;
}
