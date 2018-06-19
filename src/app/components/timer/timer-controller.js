export function TimerController(timerModel, timerView, settings) {
  this.timerModel = timerModel;
  this.timerView = timerView;
  this.settings = settings;
  this.currentInterval = null;
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
      //todo: refactor
      _this.timerModel.setCurrentTask(target.dataset.taskId);
      _this.timerModel.iterationsCompleted = 0;
      _this.timerModel.setCurrentStage(0);
    } else if (target.classList.contains('timer-btn')) {
      _this.handleTimerButtonClick(target);
    }
  });
};

TimerController.prototype.handleTimerButtonClick = function (target) {
  var action = target.dataset.timerAction;
  switch (action) {
    case 'start-pom': {
      clearInterval(this.currentInterval);
      //todo remove??????
      clearInterval(this.timerView.interval);
      this.startTimer();
      break;
    }
    case 'fail-pom': {
      clearInterval(this.currentInterval);
      //todo remove??????
      clearInterval(this.timerView.interval)
      this.timerModel.iterationsCompleted++;
      this.timerModel.updatePomodoras('failed');
      this.startTimer();
      break;
    }
    case 'finish-pom': {
      clearInterval(this.currentInterval);
      //todo remove??????
      clearInterval(this.timerView.interval)
      this.timerModel.iterationsCompleted++;
      this.timerModel.updatePomodoras('done');
      this.startTimer();
      break;
    }
  }
};

TimerController.prototype.startTimer = function () {
  if (this.timerModel.currentStage === 1) {
    if (this.timerModel.iterationsCompleted === this.settings['work-iteration-option'].current) {
      this.startLongBreak();
    } else {
      this.startShortBreak();
    }
  } else {
    this.startWork()
  }
};

TimerController.prototype.startWork = function () {
  var _this = this;
  this.timerModel.setCurrentStage(1);

  this.currentInterval = setTimeout(function () {
    _this.timerModel.iterationsCompleted++;
    _this.timerModel.updatePomodoras('done');
    console.log(_this.timerModel.currentTask);
    //todo: refactor
    if (+_this.timerModel.taskListDB.localDB[_this.timerModel.currentTaskId].estimation === _this.timerModel.taskListDB.localDB[_this.timerModel.currentTaskId].estimationUsed) {
      _this.timerModel.setCurrentStage(5);
    } else {
      _this.startTimer();
    }
  }, _this.settings['work-time-option'].current * 60 * 10);
};

TimerController.prototype.startShortBreak = function () {
  let _this = this;
  console.log('short');
  this.timerModel.setCurrentStage(2);
  this.currentInterval = setTimeout(function () {
    clearInterval(_this.timerView.interval)
    _this.timerModel.setCurrentStage(4);
  }, this.settings['short-break-option'].current * 60 * 10);
};

TimerController.prototype.startLongBreak = function () {
  console.log('long');
  let _this = this;
  this.timerModel.iterationsCompleted = 0;
  this.timerModel.setCurrentStage(3);
  this.currentInterval = setTimeout(function () {
    _this.timerModel.setCurrentStage(4);
  }, this.settings['long-break-option'].current * 60 * 10);
};


TimerController.prototype.openTimer = function () {
  this.timerView.renderTimerScreen(this.timerModel.currentTask);
};


