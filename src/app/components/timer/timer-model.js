export function TimerModel(taskListDB) {
  var _this = this;
  this.currentTaskId = null;
  this.currentTask = null;
  this.iterationsCompleted = 0;
  this.currentStage = 0;

  this.taskListDB = taskListDB;
  this.observers = [];
}


TimerModel.prototype.completePomodora = function (taskId) {

};

TimerModel.prototype.setCurrentTask = function (taskId) {
  this.currentTaskId = taskId;
  this.currentTask = this.getCurrentTask(taskId);
};

TimerModel.prototype.updatePomodoras = function (value) {
  this.taskListDB.setPomodorasArr(this.currentTaskId, value);
  this.notify(this.taskListDB.localDB[this.currentTaskId]);
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
