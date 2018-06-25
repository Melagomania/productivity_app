export function TimerModel(taskListDB) {
  this.currentTaskId = null;
  this.currentTask = null;

  this.iterationsCompleted = 0;
  this.currentStage = 0;
  this.timeLeft = null;

  this.taskListDB = taskListDB;
  this.observers = [];
}


TimerModel.prototype.setTimeLeft = function (newTimeLeft) {
  if(newTimeLeft) {
    this.timeLeft= newTimeLeft;
  } else {
    this.timeLeft--;
  }
  this.notifyTimeLeft(this.timeLeft);
};

TimerModel.prototype.setCurrentStage = function (newCurrentStage) {
  this.currentStage = newCurrentStage;
  this.notify(this.taskListDB.localDB[this.currentTaskId]);
};

TimerModel.prototype.setCurrentTask = function (taskId) {
  this.currentTaskId = taskId;
  this.currentTask = this.taskListDB.localDB[taskId];
};

TimerModel.prototype.setTaskDone = function () {
  this.taskListDB.setTaskDone(this.currentTaskId);
};

TimerModel.prototype.updatePomodoras = function (value) {
  this.taskListDB.setPomodorasArr(this.currentTaskId, value);
};

TimerModel.prototype.notify = function (data) {
  data.currentStage = this.currentStage;
  this.observers.forEach(function (observer) {
    observer.update(data);
  });
};

TimerModel.prototype.notifyTimeLeft = function (data) {
  this.observers.forEach(function (observer) {
    if(observer.updateTimeLeft) {
      observer.updateTimeLeft(data);
    }
  });
};

TimerModel.prototype.addObserver = function (observer) {
  this.observers.push(observer);
};

TimerModel.prototype.isTaskCompleted = function () {
  if (+this.taskListDB.localDB[this.currentTaskId].estimation == this.taskListDB.localDB[this.currentTaskId].estimationUsed) {
    return true;
  }
  return false;
};
