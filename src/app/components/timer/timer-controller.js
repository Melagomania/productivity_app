export function TimerController(timerModel, timerView) {
  this.timerModel = timerModel;
  this.timerView = timerView;
}

TimerController.prototype.init = function () {
  this.timerModel.addObserver(this.timerView);
  this.setEventListeners();
};

TimerController.prototype.setEventListeners = function () {
  var _this = this;
  document.getElementsByClassName('page')[0].addEventListener('click', function (e) {
    var target = e.target;
    //todo: goToTimer as a separate function
    if (target.classList.contains('task-card__goToTimer') && !target.classList.contains('task-card__start--disabled')) {
      _this.timerModel.setCurrentTaskId(target.dataset.taskId);
    } else if (target.classList.contains('timer-btn')) {
      _this.handleTimerButtonClick(target);
    }
  });
};

TimerController.prototype.handleTimerButtonClick = function (target) {
  var action = target.dataset.timerAction;
  switch (action) {
    case 'start-task': {
      this.timerModel.taskListDB.setInProgress(this.timerModel.currentTaskId);
      this.timerModel.notify(this.timerModel.currentTask);
    }
  }
};

TimerController.prototype.openTimer = function() {
  this.timerView.renderTimerScreen(this.timerModel.currentTask);
};
