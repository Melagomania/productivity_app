export function TimerModel(taskListDB) {
  this.currentTaskId = null;
  this.currentTask = null;

  this.taskListDB = taskListDB;

  this.observers = [];
}

TimerModel.prototype.setCurrentTaskId = function (newTaskId) {
  this.currentTaskId = newTaskId;
  this.currentTask = this.getCurrentTask(this.currentTaskId);
};

TimerModel.prototype.notify = function (data) {
  this.observers.forEach(function (observer) {
    observer.update(data);
  });
};

TimerModel.prototype.addObserver = function (observer) {
  this.observers.push(observer);
};

TimerModel.prototype.getCurrentTask = function (taskId) {
  return this.taskListDB.localDB[taskId];
};
