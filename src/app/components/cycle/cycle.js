export function Cycle() {
  this.cycleWrapper = document.getElementsByClassName('pom-cycle__inner-wrapper')[0];
  this.topCycleLabelsWrapper = document.getElementsByClassName('pom-cycle__top-labels')[0];
  this.bottomCycleLabelsWrapper = document.getElementsByClassName('pom-cycle__bottom-labels')[0];



  this.init = function () {
    this.cycleWrapper = document.getElementsByClassName('pom-cycle__inner-wrapper')[0];
    this.topCycleLabelsWrapper = document.getElementsByClassName('pom-cycle__top-labels')[0];
    this.bottomCycleLabelsWrapper = document.getElementsByClassName('pom-cycle__bottom-labels')[0];
  }

  this.calculateOptions = function(options) {
    let workTime = options['work-time-option'].current;
    let workIterations = options['work-iteration-option'].current;
    let totalWorkTime = (workTime * workIterations) * 2;
    let shortBreakTime = options['short-break-option'].current;
    let totalShortBreakTime = (shortBreakTime * (workIterations - 1)) * 2;
    let longBreakTime = options['long-break-option'].current;
    let totalTime = totalWorkTime + totalShortBreakTime + longBreakTime;
    let res = {
      longBreakTime: longBreakTime,
      shortBreakTime: shortBreakTime,
      totalTime: totalTime,
      shortBreakPercentage: shortBreakTime / totalTime * 100,
      workTimePercentage: workTime / totalTime * 100,
      longBreakPercentage: longBreakTime / totalTime * 100,
      workIterations: workIterations,
    }
    this.renderConfig = res;
    return res;
  }

  this.renderCycle = function(options) {
    this.clearWrapper(this.cycleWrapper)
    for(let i = 0; i < 2; i++) {
      for(let j = 0; j < options.workIterations * 2 - 1; j++) {
        let el = document.createElement('div');
        el.classList.add('pom-cycle__line');
        if(j % 2 !== 0) {
          el.classList.add('pom-cycle__line--short-break');
          el.style.width = options.shortBreakPercentage + '%';
        } else {
          el.classList.add('pom-cycle__line--work-time');
          el.style.width = options.workTimePercentage + '%';
        }
        if(i === (options.workIterations * 2 - 1) - 1) {
          break;
        }
        this.cycleWrapper.appendChild(el);
      }
      if(i === 1) break;
      let longBreak = document.createElement('div');
      longBreak.classList.add('pom-cycle__line');
      longBreak.classList.add('pom-cycle__line--long-break');
      longBreak.style.width = options.longBreakPercentage + '%';
      this.cycleWrapper.appendChild(longBreak);
    }
  }

  this.renderTopCycleLabels = function(options) {
    this.clearWrapper(this.topCycleLabelsWrapper);
    for(let i = 0; i < 3; i++) {
      let label = document.createElement('div');
      let labelText = document.createElement('span');
      let labelCircle = document.createElement('span');

      label.classList.add('pom-cycle__label');
      switch (i) {
        case 0:
          label.style.left = 0;
          labelText.textContent = '0m';
          break;
        case 1:
          label.style.left = `calc(${50 + options.longBreakPercentage / 2}%  - 3px)`;
          labelText.textContent = this.convertTime(options.totalTime / 2 + options.longBreakTime / 2);
          break;
        case 2:
          label.style.right = '0';
          labelText.textContent = this.convertTime(options.totalTime);
          break;

      }
      labelText.classList.add('pom-cycle__label-text');
      labelCircle.classList.add('pom-cycle__label-circle');

      label.appendChild(labelText);
      label.appendChild(labelCircle);
      this.topCycleLabelsWrapper.appendChild(label);
    }
  }

  this.renderBottomCycleLabels = function(options) {
    this.clearWrapper(this.bottomCycleLabelsWrapper);
    for(let i = 30; i <= options.totalTime; i = i + 30) {
      let label = document.createElement('div');
      let labelCircle = document.createElement('span');
      let labelText = document.createElement('span');

      labelText.textContent = this.convertTime(i);
      label.style.left = `calc(${i / options.totalTime * 100}% - 3px)`;
      label.classList.add('pom-cycle__label');
      labelText.classList.add('pom-cycle__label-text');
      labelCircle.classList.add('pom-cycle__label-circle');

      label.appendChild(labelCircle);
      label.appendChild(labelText);
      this.bottomCycleLabelsWrapper.appendChild(label);
    }
  }

  this.convertTime = function(minutes) {
    let res;
    let hours = parseInt(minutes / 60);
    minutes = minutes % 60;
    if(hours && minutes) {
      res = `${hours}h ${minutes}m`;
    } else if(minutes){
      res = `${minutes}m`;
    } else {
      res = `${hours}h`;
    }
    return res;
  }

  this.clearWrapper = function(el) {
    while(el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
}
