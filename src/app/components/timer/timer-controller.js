export function TimerController(timerModel, timerView, settings) {
  this.timerModel = timerModel;
  this.timerView = timerView;
  this.settings = settings;

  this.iterationsCompleted = 0;
  this.currentStage = '';
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
      // this.timerModel.taskListDB.setInProgress(this.timerModel.currentTaskId);
      // this.timerModel.notify(this.timerModel.currentTask);
      console.log(this.settings);
      this.startTimer();
    }
  }
};

TimerController.prototype.startTimer = function () {
  console.log(this.iterationsCompleted);
  if (this.iterationsCompleted % 2 === 0) {
    this.startWork();
  } else {
    if(this.iterationsCompleted === this.settings['work-iteration-option'].current) {
      // this.iterationsCompleted++;
      console.log('long');
    } else {
      // this.iterationsCompleted++;
      console.log('short');
    }
  }
};


TimerController.prototype.startWork = function () {
  console.log('work');
  this.currentStage = 'working';
  this.iterationsCompleted++;
};



TimerController.prototype.openTimer = function () {
  this.timerView.renderTimerScreen(this.timerModel.currentTask);
};


