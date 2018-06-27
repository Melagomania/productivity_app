export function TimerView(settings) {
  this.templates = {
    timerIterations: require('./timer-pomodoras.hbs'),
    timerClock: require('./timer-clock.hbs'),
    timerButtons: require('./timer-buttons.hbs'),
    timerHeadings: require('./timer-headings.hbs'),
    timerArrows: require('./timer-arrows.hbs')
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

TimerView.prototype.updateTimeLeft = function (data) {
  document.getElementById('timer-time-indicator').textContent = data;
};

TimerView.prototype.renderTimerScreen = function (data) {
  this.renderButtons(data);
  this.renderClock(data);
  this.renderHeadings(data);
  this.renderPomodoras(data);
  this.renderArrows(data);
};

TimerView.prototype.renderButtons = function (data) {
  let buttonsContainer = document.getElementById('timer-buttons-container');
  buttonsContainer.innerHTML = this.templates.timerButtons(data);
};

TimerView.prototype.renderArrows = function (data) {
  let arrowsContainer = document.getElementById('timer-arrows-container');
  arrowsContainer.innerHTML = this.templates.timerArrows(data);
};

TimerView.prototype.renderHeadings = function (data) {
  let headingsContainer = document.getElementById('timer-headings-container');
  headingsContainer.innerHTML = this.templates.timerHeadings(data);
};

TimerView.prototype.renderClock = function (data) {
  let clock = document.getElementById('timer-clock');
  clock.innerHTML = this.templates.timerClock(data);
  this.saveDOMElmenents();
  let time;
  let timeIndicatorInterval;
  switch (data.currentStage) {
    case 1: {
      time = this.settings['work-time-option'].current * 1000;
      timeIndicatorInterval = time / this.settings['work-time-option'].current;
      break;
    }
    case 2: {
      time = this.settings['short-break-option'].current * 1000;
      timeIndicatorInterval = time / this.settings['short-break-option'].current ;
      break;
    }
    case 3: {
      time = this.settings['long-break-option'].current * 1000;
      timeIndicatorInterval = time / this.settings['long-break-option'].current;
      break;
    }
    default: {
      break;
    }
  }
  if(data.currentStage !== 0 && data.currentStage !== 5 && data.currentStage !== 4) {
    this.startAnimations(time);
  }

};

TimerView.prototype.renderPomodoras = function (data) {
  let pomodorasContainer = document.getElementById('timer-iterations-container');
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
