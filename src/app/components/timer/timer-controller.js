export function TimerController(timerModel, timerView, settings) {
  this.timerModel = timerModel;
  this.timerView = timerView;
  this.settings = settings;
  this.currentInterval = null;
  this.timeLeftInterval = null;
}

TimerController.prototype.init = function () {
  this.timerModel.addObserver(this.timerView);
  this.setEventListeners();
};

TimerController.prototype.setEventListeners = function () {
  var _this = this;
  document.getElementsByClassName('page')[0].addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('task-card__goToTimer') && !target.classList.contains('task-card__start--disabled')) {
      _this.initTask(target.dataset.taskId);
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
      clearTimeout(this.timeLeftInterval);
      this.startTimer();
      break;
    }
    case 'fail-pom': {
      clearInterval(this.currentInterval);
      clearTimeout(this.timeLeftInterval);
      this.timerModel.iterationsCompleted++;
      this.timerModel.updatePomodoras('failed');
      if (this.timerModel.isTaskCompleted()) {
        this.timerModel.setTaskDone();
        this.timerModel.setCurrentStage(5);
      } else {
        this.startTimer();
      }
      break;
    }
    case 'finish-pom': {
      clearInterval(this.currentInterval);
      clearTimeout(this.timeLeftInterval);
      this.timerModel.iterationsCompleted++;
      this.timerModel.updatePomodoras('done');
      if (this.timerModel.isTaskCompleted()) {
        this.timerModel.setTaskDone();
        this.timerModel.setCurrentStage(5);
      } else {
        this.startTimer();
      }
      break;
    }
    case 'finish-task': {
      clearInterval(this.currentInterval);
      clearTimeout(this.timeLeftInterval);
      this.timerModel.setTaskDone();
      this.timerModel.setCurrentStage(5);

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

  this.timerModel.setTimeLeft(_this.settings['work-time-option'].current);
  this.setTimeLeftTimer(60 * 10);

  this.currentInterval = setTimeout(function () {
    _this.timerModel.iterationsCompleted++;
    _this.timerModel.updatePomodoras('done');

    if (+_this.timerModel.isTaskCompleted()) {
      _this.timerModel.setTaskDone();
      _this.timerModel.setCurrentStage(5);
    } else {
      _this.startTimer();
    }
  }, _this.settings['work-time-option'].current * 60 * 10);
};

TimerController.prototype.startShortBreak = function () {
  let _this = this;
  this.timerModel.setCurrentStage(2);

  this.timerModel.setTimeLeft(_this.settings['short-break-option'].current);
  this.setTimeLeftTimer(60 * 10);


  this.currentInterval = setTimeout(function () {
    _this.timerModel.setCurrentStage(4);
  }, this.settings['short-break-option'].current * 60 * 10);
};

TimerController.prototype.startLongBreak = function () {
  let _this = this;
  this.timerModel.iterationsCompleted = 0;
  this.timerModel.setCurrentStage(3);

  this.timerModel.setTimeLeft(_this.settings['long-break-option'].current);
  this.setTimeLeftTimer(60 * 10);


  this.currentInterval = setTimeout(function () {
    _this.timerModel.setCurrentStage(4);
  }, this.settings['long-break-option'].current * 60 * 10);
};


TimerController.prototype.openTimer = function () {
  this.timerView.renderTimerScreen(this.timerModel.currentTask);
};


TimerController.prototype.setTimeLeftTimer = function (time) {
  var _this = this;
  this.timeLeftInterval = setTimeout(function () {
    _this.timerModel.setTimeLeft();
    if(_this.timerModel.timeLeft === 1) {
      clearTimeout(_this.timeLeftInterval);
    } else {
      _this.setTimeLeftTimer(time);
    }
  }, time);
};

TimerController.prototype.initTask = function (taskId) {
  this.timerModel.setCurrentTask(taskId);
  this.timerModel.iterationsCompleted = 0;
  this.timerModel.setCurrentStage(0);
};

