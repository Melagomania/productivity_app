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


    //todo: refactor:
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

    this.tempOptions = {
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

  init() {
    this.getSettingsFromFirebase();
    this.setEventListeners();
  }

  renderSettingsFieldsInputs() {
    this.tempOptions['work-time-option'].current = this.options['work-time-option'].current;
    this.tempOptions['work-iteration-option'].current = this.options['work-iteration-option'].current;
    this.tempOptions['long-break-option'].current = this.options['long-break-option'].current;
    this.tempOptions['short-break-option'].current = this.options['short-break-option'].current;
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

  setEventListeners() {
    document.getElementById('page').addEventListener('click', (e) => {
      if(e.target.dataset.action === 'save-settings') {
        this.saveSettingsToFirebase();
      }
    });
  }

  renderOptions() {
    for (let i in this.circleElements.inputs) {
      this.circleElements.inputs[i].value = this.options[i].current;
    }
  }

  renderOption(field) {
    this.circleElements.inputs[field].value = this.tempOptions[field].current;
  }

  modifyOption(field, action) {
    switch (action) {
      case 'plus':
        if (this.tempOptions[field].current !== this.tempOptions[field].max) {
          this.tempOptions[field].current += this.tempOptions[field].step;
        }
        break;
      case 'minus':
        if (this.tempOptions[field].current !== this.tempOptions[field].min) {
          this.tempOptions[field].current -= this.tempOptions[field].step;
        }
        break;
    }
    this.notify(this.tempOptions);
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

  getSettingsFromFirebase() {
    let _this = this;
    let ref = firebase.database().ref(`settings`);
    ref.once('value', function (snapshot) {
      let result = snapshot.val();
      if(result) {
        _this.options['work-time-option'].current = result['work-time-option'];
        _this.options['work-iteration-option'].current = result['work-iteration-option'];
        _this.options['long-break-option'].current = result['long-break-option'];
        _this.options['short-break-option'].current = result['short-break-option'];

        _this.tempOptions['work-time-option'].current = result['work-time-option'];
        _this.tempOptions['work-iteration-option'].current = result['work-iteration-option'];
        _this.tempOptions['long-break-option'].current = result['long-break-option'];
        _this.tempOptions['short-break-option'].current = result['short-break-option'];
        
        try{
          _this.renderOptions();
          _this.notify(_this.options)
        } catch (e) {
          console.log('Not settings page');
        }
      }
    });
  }

  saveSettingsToFirebase() {
    this.options['work-time-option'].current = this.tempOptions['work-time-option'].current;
    this.options['work-iteration-option'].current = this.tempOptions['work-iteration-option'].current;
    this.options['long-break-option'].current = this.tempOptions['long-break-option'].current;
    this.options['short-break-option'].current = this.tempOptions['short-break-option'].current;

    firebase.database().ref('settings/').update({
      'work-time-option': this.options['work-time-option'].current,
      'work-iteration-option': this.options['work-iteration-option'].current,
      'long-break-option': this.options['long-break-option'].current,
      'short-break-option': this.options['short-break-option'].current
    });
  }
}
