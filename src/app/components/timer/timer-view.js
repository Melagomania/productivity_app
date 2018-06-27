export class TimerView {
  constructor(settings) {
    this.settings = settings;

    this.templates = {
      timerIterations: require('./timer-pomodoras.hbs'),
      timerClock: require('./timer-clock.hbs'),
      timerButtons: require('./timer-buttons.hbs'),
      timerHeadings: require('./timer-headings.hbs'),
      timerArrows: require('./timer-arrows.hbs')
    };
    this.circleElements = null;
    //todo: rename::::::
    this.interval = null;
  }

  saveDOMElements() {
    this.circleElements = {
      clockCircle: document.getElementsByClassName('timer__inner-clock-circle')[0],
      circleRightPart: document.getElementsByClassName('timer__circle-right-part')[0],
      circleHider: document.getElementsByClassName('timer__circle-hider')[0],
      timerIndicator: document.getElementById('timer-time-indicator')
    };
  }

  update(data) {
    this.renderTimerScreen(data);
  }

  updateTimeLeft(data) {
    this.circleElements.timerIndicator.textContent = data;
  }

  renderTimerScreen(data) {
    this.renderButtons(data);
    this.renderClock(data);
    this.renderHeadings(data);
    this.renderPomodoras(data);
    this.renderArrows(data);
  }

  renderButtons(data) {
    let buttonsContainer = document.getElementById('timer-buttons-container');
    buttonsContainer.innerHTML = this.templates.timerButtons(data);
  }

  renderArrows(data) {
    let arrowsContainer = document.getElementById('timer-arrows-container');
    arrowsContainer.innerHTML = this.templates.timerArrows(data);
  }

  renderHeadings(data) {
    let headingsContainer = document.getElementById('timer-headings-container');
    headingsContainer.innerHTML = this.templates.timerHeadings(data);
  }

  renderClock(data) {
    let clock = document.getElementById('timer-clock');
    clock.innerHTML = this.templates.timerClock(data);
    this.saveDOMElements();
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
        timeIndicatorInterval = time / this.settings['short-break-option'].current;
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
    if (data.currentStage !== 0 && data.currentStage !== 5 && data.currentStage !== 4) {
      this.startAnimations(time);
    }
  }

  renderPomodoras(data) {
    let pomodorasContainer = document.getElementById('timer-iterations-container');
    pomodorasContainer.innerHTML = this.templates.timerIterations(data);
  }

  startAnimations(time) {
    this.circleElements.circleRightPart.classList.add('timer__circle-right-part--animated');
    this.circleElements.clockCircle.classList.add('timer__inner-clock-circle--animated');
    this.circleElements.circleHider.classList.add('timer__circle-hider--animated');

    this.circleElements.circleRightPart.style.animationDuration = time + 'ms';
    this.circleElements.clockCircle.style.animationDuration = time + 'ms';
    this.circleElements.circleHider.style.animationDuration = time + 'ms';
  }

}
