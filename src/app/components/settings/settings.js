import {cycle} from './../../app';
export function Settings(cycle) {
  this.cycle = cycle;
  var _this = this;
  _this.elements = {
    fields: document.getElementsByClassName('pom-settings__input-wrapper'),
    inputs: {
      'work-time-option': document.getElementById('work-time-input'),
      'work-iteration-option': document.getElementById('work-iteration-input'),
      'short-break-option': document.getElementById('short-break-input'),
      'long-break-option': document.getElementById('long-break-input')
    }
  }

  _this.options = {
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

  _this.init = function () {
    this.renderOptions();
    for (var i = 0; i < _this.elements.fields.length; i++) {
      this.elements.fields[i].addEventListener('click', _this.handleClick);
    }
  }

  _this.renderOptions = function () {
    for (let i in _this.elements.inputs) {
      _this.elements.inputs[i].value = _this.options[i].current;
    }
  }

  _this.renderOption = function (field) {
    _this.elements.inputs[field].value = _this.options[field].current;
  }

  _this.modifyOption = function (field, action) {
    switch (action) {
      case 'plus':
        if (_this.options[field].current !== _this.options[field].max) {
          _this.options[field].current += _this.options[field].step;
        }
        break;
      case 'minus':
        if (_this.options[field].current !== _this.options[field].min) {
          _this.options[field].current -= _this.options[field].step;
        }
        break;
    }
  }

  _this.handleClick = function (e) {
    if (e.target.classList.contains('pom-settings__btn')) {
      var clickedField = e.target.parentNode.id;
      var buttonAction;
      if (e.target.classList.contains('pom-settings__btn--plus')) {
        buttonAction = 'plus';
      } else if (e.target.classList.contains('pom-settings__btn--minus')) {
        buttonAction = 'minus';
      }
      _this.modifyOption(clickedField, buttonAction);
      _this.renderOption(clickedField);
      cycle.calculateOptions(_this.options);
      cycle.renderCycle(cycle.renderConfig)
      cycle.renderTopCycleLabels(cycle.renderConfig);
      cycle.renderBottomCycleLabels(cycle.renderConfig);
    }
  }
}
// module.exports = Settings;
