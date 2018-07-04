export class TimerController {
  constructor(timerModel, timerView, settings) {
    this.timerModel = timerModel;
    this.timerView = timerView;
    this.settings = settings;
    this.currentInterval = null;
    this.timeLeftInterval = null;
  }

  init() {
    this.timerModel.addObserver(this.timerView);
    this.setEventListeners();
  }

  setEventListeners() {
    let _this = this;
    document.getElementsByClassName('page')[0].addEventListener('click', function (e) {
      let target = e.target;
      if (target.classList.contains('task-card__goToTimer') && !target.classList.contains('task-card__start--disabled')) {

        _this.initTask(target.dataset.taskId);
      } else if (target.classList.contains('timer-btn')) {
        _this.handleTimerButtonClick(target);
      }
    });
  }

  handleTimerButtonClick(target) {
    let action = target.dataset.timerAction;
    switch (action) {
      case 'start-pom': {
        //todo: clearTimeout as a separate method
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
  }

  startTimer() {
    if (this.timerModel.currentStage === 1) {
      if (this.timerModel.iterationsCompleted === this.settings['work-iteration-option'].current) {
        this.startLongBreak();
      } else {
        this.startShortBreak();
      }
    } else {
      this.startWork()
    }
  }

  startWork() {
    let _this = this;
    this.timerModel.setCurrentStage(1);

    this.timerModel.setTimeLeft(_this.settings['work-time-option'].current);
    this.setTimeLeftTimer(1000);

    this.currentInterval = setTimeout(function () {
      _this.timerModel.iterationsCompleted++;
      _this.timerModel.updatePomodoras('done');

      if (+_this.timerModel.isTaskCompleted()) {
        _this.timerModel.setTaskDone();
        _this.timerModel.setCurrentStage(5);
      } else {
        _this.startTimer();
      }
    }, _this.settings['work-time-option'].current * 1000);
  }

  startShortBreak() {
    let _this = this;
    this.timerModel.setCurrentStage(2);

    this.timerModel.setTimeLeft(_this.settings['short-break-option'].current);
    this.setTimeLeftTimer(1000);


    this.currentInterval = setTimeout(function () {
      _this.timerModel.setCurrentStage(4);
    }, this.settings['short-break-option'].current * 1000);
  }

  startLongBreak() {
    let _this = this;
    this.timerModel.iterationsCompleted = 0;
    this.timerModel.setCurrentStage(3);

    this.timerModel.setTimeLeft(_this.settings['long-break-option'].current);
    this.setTimeLeftTimer(1000);


    this.currentInterval = setTimeout(function () {
      _this.timerModel.setCurrentStage(4);
    }, this.settings['long-break-option'].current * 1000);
  }

  openTimer() {
    this.timerView.renderTimerScreen(this.timerModel.currentTask);
  }

  setTimeLeftTimer(time) {
    let _this = this;
    this.timeLeftInterval = setTimeout(function () {
      _this.timerModel.setTimeLeft();
      if (_this.timerModel.timeLeft === 1) {
        clearTimeout(_this.timeLeftInterval);
      } else {
        _this.setTimeLeftTimer(time);
      }
    }, time);
  }

  initTask(taskId) {
    this.timerModel.setCurrentTask(taskId);
    this.timerModel.iterationsCompleted = 0;
    this.timerModel.setCurrentStage(0);
  }

}
