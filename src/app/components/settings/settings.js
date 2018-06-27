export class Settings {
  constructor(cycle) {
    this.observers = [];
    this.cycle = cycle;

    this.circleElements = {
      fields: document.getElementsByClassName('pom-settings__input-wrapper'),
      inputs: {
        'work-time-option': document.getElementById('work-time-input'),
        'work-iteration-option': document.getElementById('work-iteration-input'),
        'short-break-option': document.getElementById('short-break-input'),
        'long-break-option': document.getElementById('long-break-input')
      }
    };

    this.options = {
      'work-time-option': {
        current: 25,
        min: 15,
        max: 35,
        step: 5
      },
      'work-iteration-option': {
        current: 5,
        min: 2,
        max: 5,
        step: 1
      },
      'short-break-option': {
        current: 5,
        min: 3,
        max: 5,
        step: 1
      },
      'long-break-option': {
        current: 30,
        min: 15,
        max: 40,
        step: 5
      }
    };
  }

  renderSettingsFieldsInputs() {
    let _this = this;
    this.circleElements = {
      fields: document.getElementsByClassName('pom-settings__input-wrapper'),
      inputs: {
        'work-time-option': document.getElementById('work-time-input'),
        'work-iteration-option': document.getElementById('work-iteration-input'),
        'short-break-option': document.getElementById('short-break-input'),
        'long-break-option': document.getElementById('long-break-input')
      }
    };
    this.renderOptions();
    for (let i = 0; i < this.circleElements.fields.length; i++) {
      this.circleElements.fields[i].addEventListener('click', function(e) {
        _this.handleClick(e);
      });
    }
  }

  renderOptions() {
    for (let i in this.circleElements.inputs) {
      this.circleElements.inputs[i].value = this.options[i].current;
    }
  }

  renderOption(field) {
    this.circleElements.inputs[field].value = this.options[field].current;
  }

  modifyOption(field, action) {
    switch (action) {
      case 'plus':
        if (this.options[field].current !== this.options[field].max) {
          this.options[field].current += this.options[field].step;
        }
        break;
      case 'minus':
        if (this.options[field].current !== this.options[field].min) {
          this.options[field].current -= this.options[field].step;
        }
        break;
    }
    this.notify(this.options);
  }

  handleClick(e) {
    if (e.target.classList.contains('pom-settings__btn')) {
      let clickedField = e.target.parentNode.id;
      let buttonAction;
      if (e.target.classList.contains('pom-settings__btn--plus')) {
        buttonAction = 'plus';
      } else if (e.target.classList.contains('pom-settings__btn--minus')) {
        buttonAction = 'minus';
      }
      this.modifyOption(clickedField, buttonAction);
      this.renderOption(clickedField);
    }
  }

  notify(data) {
    this.observers.forEach( observer => observer.update(data));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }
}
