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
      _this.timerModel.currentStage = 0;
    } else if (target.classList.contains('timer-btn')) {
      _this.handleTimerButtonClick(target);
    }
  });
};

TimerController.prototype.handleTimerButtonClick = function (target) {
  var action = target.dataset.timerAction;
  switch (action) {
    case 'start-task': {
      this.startTimer();
    }
  }
};

TimerController.prototype.startTimer = function () {
  console.log(this.timerModel.iterationsCompleted);
  if (this.timerModel.currentStage === 2 || this.timerModel.currentStage === 3 || this.timerModel.currentStage === 0) {
    this.startWork();
  } else if (this.timerModel.currentStage === 1) {
    if(this.timerModel.iterationsCompleted === this.settings['work-iteration-option'].current) {
      console.log('long');
      this.timerView.startAnimations(this.settings['long-break-option'].current * 60 * 10);
      this.timerModel.currentStage = 3;
      this.timerModel.iterationsCompleted = 0;
    } else {
      this.timerModel.currentStage = 2;
      this.timerView.startAnimations(this.settings['short-break-option'].current * 60 * 10);
      console.log('short');
    }
  }
};

TimerController.prototype.startWork = function () {
  var _this = this;
  console.log(_this.settings['work-time-option'].current * 60 * 10);
  this.timerModel.currentStage = 1;
  this.timerModel.notify(this.timerModel.taskListDB.localDB[this.timerModel.currentTaskId]);
  this.timerView.startAnimations(_this.settings['work-time-option'].current * 60 * 10);

  this.currentInterval = setTimeout(function () {
    _this.timerModel.iterationsCompleted++;
    _this.timerModel.updatePomodoras('done');
    _this.startTimer();
  }, _this.settings['work-time-option'].current * 60 * 10);


  // if(this.timerModel.iterationsCompleted === this.settings['work-iteration-option'].current * 2) {
  //   console.log('stop');
  // }
};

TimerController.startShortBreak = function () {
  console.log('short');
  this.timerModel.currentStage = 2;
};



TimerController.prototype.openTimer = function () {
  this.timerView.renderTimerScreen(this.timerModel.currentTask);
};


