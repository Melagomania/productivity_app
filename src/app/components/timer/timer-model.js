export class TimerModel {
  constructor(taskListDB) {
    this.currentTaskId = null;
    this.currentTask = null;

    this.iterationsCompleted = 0;
    this.currentStage = 0;
    this.timeLeft = null;

    this.taskListDB = taskListDB;
    this.observers = [];
  }

  setTimeLeft(newTimeLeft) {
    if (newTimeLeft) {
      this.timeLeft = newTimeLeft;
    } else {
      this.timeLeft--;
    }
    this.notifyTimeLeft(this.timeLeft);
  }

  setCurrentStage(newCurrentStage) {
    this.currentStage = newCurrentStage;
    this.notify(this.taskListDB.localDB[this.currentTaskId]);
  }

  setCurrentTask(taskId) {
    this.currentTaskId = taskId;
    this.currentTask = this.taskListDB.localDB[taskId];
  }

  setTaskDone() {
    this.taskListDB.setTaskDone(this.currentTaskId);
  }

  updatePomodoras(value) {
    this.taskListDB.setPomodorasArr(this.currentTaskId, value);
  }

  notify(data) {
    data.currentStage = this.currentStage;
    this.observers.forEach(function (observer) {
      observer.update(data);
    });
  }

  notifyTimeLeft(data) {
    this.observers.forEach(function (observer) {
      if (observer.updateTimeLeft) {
        observer.updateTimeLeft(data);
      }
    });
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  isTaskCompleted() {
    return this.taskListDB.localDB[this.currentTaskId].estimation === this.taskListDB.localDB[this.currentTaskId].pomodorasCompleted;
  }
}
