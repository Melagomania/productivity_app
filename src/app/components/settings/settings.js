export class Settings {
  constructor() {
    this.observers = [];
    this.DOMElements = {
      fields: null,
      inputs: {}
    };

    this.settings = {
      'work-time-option': {
        current: 25,
        temp: 25,
        min: 15,
        max: 35,
        step: 5
      },
      'work-iteration-option': {
        current: 5,
        temp: 5,
        min: 2,
        max: 5,
        step: 1
      },
      'short-break-option': {
        current: 5,
        temp: 5,
        min: 3,
        max: 5,
        step: 1
      },
      'long-break-option': {
        current: 30,
        temp: 30,
        min: 15,
        max: 40,
        step: 5
      }
    };
  }

  init() {
    this.getSettingsFromFirebase();
    this.setEventListeners();
  }

  renderSettingsInputs() {
    let _this = this;
    this.resetTempSettings();
    this.getDOMElements();

    this.renderOptions();
    for (let i = 0; i < this.DOMElements.fields.length; i++) {
      this.DOMElements.fields[i].addEventListener('click', function (e) {
        _this.handleClick(e);
      });
    }
  }

  resetTempSettings() {
    this.settings['work-time-option'].temp = this.settings['work-time-option'].current;
    this.settings['work-iteration-option'].temp = this.settings['work-iteration-option'].current;
    this.settings['long-break-option'].temp = this.settings['long-break-option'].current;
    this.settings['short-break-option'].temp = this.settings['short-break-option'].current;
  }

  getDOMElements() {
    this.DOMElements.fields = document.getElementsByClassName('pom-settings__input-wrapper');
    this.DOMElements.inputs['work-time-option'] = document.getElementById('work-time-input');
    this.DOMElements.inputs['work-iteration-option'] = document.getElementById('work-iteration-input');
    this.DOMElements.inputs['short-break-option'] = document.getElementById('short-break-input');
    this.DOMElements.inputs['long-break-option'] = document.getElementById('long-break-input');
  }


  setEventListeners() {
    document.getElementById('page').addEventListener('click', (e) => {
      if (e.target.dataset.action === 'save-settings') {
        this.saveSettingsToFirebase();
      }
    });
  }

  renderOptions() {
    for (let i in this.DOMElements.inputs) {
      this.DOMElements.inputs[i].value = this.settings[i].current;
    }
  }

  renderOption(field) {
    this.DOMElements.inputs[field].value = this.settings[field].temp;
  }

  modifyOption(field, action) {
    switch (action) {
      case 'plus':
        if (this.settings[field].temp !== this.settings[field].max) {
          this.settings[field].temp += this.settings[field].step;
        }
        break;
      case 'minus':
        if (this.settings[field].temp !== this.settings[field].min) {
          this.settings[field].temp -= this.settings[field].step;
        }
        break;
    }
    this.notify(this.settings);
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

  getSettingsFromFirebase() {
    let _this = this;
    let ref = firebase.database().ref(`settings`);
    ref.once('value', function (snapshot) {
      let result = snapshot.val();
      if (result) {
        _this.settings['work-time-option'].current = result['work-time-option'];
        _this.settings['work-iteration-option'].current = result['work-iteration-option'];
        _this.settings['long-break-option'].current = result['long-break-option'];
        _this.settings['short-break-option'].current = result['short-break-option'];

        _this.settings['work-time-option'].temp = result['work-time-option'];
        _this.settings['work-iteration-option'].temp = result['work-iteration-option'];
        _this.settings['long-break-option'].temp = result['long-break-option'];
        _this.settings['short-break-option'].temp = result['short-break-option'];

        try {
          _this.renderOptions();
          _this.notify(_this.settings)
        } catch (e) {
          console.log('Not settings page');
        }
      }
    });
  }

  saveSettingsToFirebase() {
    this.settings['work-time-option'].current = this.settings['work-time-option'].temp;
    this.settings['work-iteration-option'].current = this.settings['work-iteration-option'].temp;
    this.settings['long-break-option'].current = this.settings['long-break-option'].temp;
    this.settings['short-break-option'].current = this.settings['short-break-option'].temp;

    firebase.database().ref('settings/').update({
      'work-time-option': this.settings['work-time-option'].current,
      'work-iteration-option': this.settings['work-iteration-option'].current,
      'long-break-option': this.settings['long-break-option'].current,
      'short-break-option': this.settings['short-break-option'].current
    });
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }
}
