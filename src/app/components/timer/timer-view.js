export function TimerView(settings) {
  this.templates = {
    timerIterations: require('./timer-pomodoras.hbs'),
    timerClock: require('./timer-clock.hbs'),
    timerButtons: require('./timer-buttons.hbs'),
    timerHeadings: require('./timer-headings.hbs')
  };
  this.elements = null;
  this.settings = settings;
  this.interval;
}

TimerView.prototype.saveDOMElmenents = function () {
  this.elements = {
    clockCircle: document.getElementsByClassName('timer__inner-clock-circle')[0],
    circleRightPart: document.getElementsByClassName('timer__circle-right-part')[0],
    circleHider: document.getElementsByClassName('timer__circle-hider')[0],
    timeIndicator: document.getElementById('timer-time-indicator')
  };
};

TimerView.prototype.update = function (data) {
  this.renderTimerScreen(data);
};

TimerView.prototype.renderTimerScreen = function (data) {
  this.renderButtons(data);
  this.renderClock(data);
  this.renderHeadings(data);
  this.renderPomodoras(data);
};

TimerView.prototype.renderButtons = function (data) {
  var buttonsContainer = document.getElementById('timer-buttons-container');
  buttonsContainer.innerHTML = this.templates.timerButtons(data);
};

TimerView.prototype.renderHeadings = function (data) {
  var headingsContainer = document.getElementById('timer-headings-container');
  headingsContainer.innerHTML = this.templates.timerHeadings(data);
};

TimerView.prototype.renderClock = function (data) {
  var clock = document.getElementById('timer-clock');
  clock.innerHTML = this.templates.timerClock(data);
  this.saveDOMElmenents();
  let time;

  switch (data.currentStage) {
    case 1: {
      time = this.settings['work-time-option'].current * 60 * 10;
      this.startAnimations(time);
      this.elements.timeIndicator.textContent = this.settings['work-time-option'].current;
      this.setTimeTimeout(time / this.settings['work-time-option'].current);
      break;
    }
    case 2: {
      time = this.settings['short-break-option'].current * 60 * 10;
      this.startAnimations(time);
      this.elements.timeIndicator.textContent = this.settings['short-break-option'].current;
      this.setTimeTimeout(time / this.settings['short-break-option'].current * 60 * 10);
      break;
    }
    case 3: {
      time = this.settings['long-break-option'].current * 60 * 10;
      this.startAnimations(time);
      this.elements.timeIndicator.textContent = this.settings['long-break-option'].current;
      this.setTimeTimeout(time / this.settings['long-break-option'].current * 60 * 10);
      break;
    }
    default: {
      break;
    }
  }
};

TimerView.prototype.renderPomodoras = function (data) {
  var pomodorasContainer = document.getElementById('timer-iterations-container');
  pomodorasContainer.innerHTML = this.templates.timerIterations(data);
};

TimerView.prototype.startAnimations = function (time) {
  this.elements.circleRightPart.classList.add('timer__circle-right-part--animated');
  this.elements.clockCircle.classList.add('timer__inner-clock-circle--animated');
  this.elements.circleHider.classList.add('timer__circle-hider--animated');

  this.elements.circleRightPart.style.animationDuration = time + 'ms';
  this.elements.clockCircle.style.animationDuration = time + 'ms';
  this.elements.circleHider.style.animationDuration = time + 'ms';
};

TimerView.prototype.setTimeTimeout = function (time) {
  let _this = this;
  this.interval = setInterval(function () {
    _this.elements.timeIndicator.textContent--;
    if(+_this.elements.timeIndicator.textContent === 1) {
      clearInterval(_this.interval);
    }
  }, time);
};
