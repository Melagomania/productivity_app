export function TimerView() {
  this.templates = {
    timerIterations: require('./timer-pomodoras.hbs'),
    timerClock: require('./timer-clock.hbs'),
    timerButtons: require('./timer-buttons.hbs'),
    timerHeadings: require('./timer-headings.hbs')
  };

  this.elements = null;
}

TimerView.prototype.saveDOMElmenents = function () {
  this.elements = {
    clockCircle: document.getElementsByClassName('timer__inner-clock-circle')[0],
    circleRightPart: document.getElementsByClassName('timer__circle-right-part')[0],
    circleHider: document.getElementsByClassName('timer__circle-hider')[0]
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
};

TimerView.prototype.renderPomodoras = function (data) {
  var pomodorasContainer = document.getElementById('timer-iterations-container');
  pomodorasContainer.innerHTML = this.templates.timerIterations(data);
};

TimerView.prototype.startAnimations = function (time) {
  this.saveDOMElmenents();

  this.elements.circleRightPart.classList.add('timer__circle-right-part--animated');
  this.elements.clockCircle.classList.add('timer__inner-clock-circle--animated');
  this.elements.circleHider.classList.add('timer__circle-hider--animated');

  this.elements.circleRightPart.style.animationDuration = time + 'ms';
  this.elements.clockCircle.style.animationDuration = time + 'ms';
  this.elements.circleHider.style.animationDuration = time + 'ms';
};
