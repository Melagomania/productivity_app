import {cycle} from './../../app';
export function Settings() {
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
      min: 3,
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
      current :30,
      min: 15,
      max: 40,
      step: 5
    }
  };

  _this.init = function() {
    this.renderOptions();
    for(var i = 0; i < _this.elements.fields.length; i++) {
      this.elements.fields[i].addEventListener('click', _this.handleClick);
    }
    
    
  }

  _this.renderOptions = function() {
    _this.elements.inputs['work-time-option'].value = _this.options['work-time-option'].current;
    _this.elements.inputs['work-iteration-option'].value = _this.options['work-iteration-option'].current;
    _this.elements.inputs['short-break-option'].value = _this.options['short-break-option'].current;
    _this.elements.inputs['long-break-option'].value = _this.options['long-break-option'].current;
  } 

  _this.renderOption = function(field) {
    _this.elements.inputs[field].value = _this.options[field].current;
  }

  _this.modifyOption = function(field, action) {
    switch(action) {
      case 'plus':
        if(_this.options[field].current !== _this.options[field].max) {
          _this.options[field].current += _this.options[field].step;   
        }
        break;
      case 'minus':
        if(_this.options[field].current !== _this.options[field].min) {
          _this.options[field].current -= _this.options[field].step;   
        }
        break;
    }
  }

  _this.handleClick = function(e) {
    if(e.target.classList.contains('pom-settings__btn')){
      var clickedField = e.target.parentNode.id;
      var buttonAction;
      if(e.target.classList.contains('pom-settings__btn--plus')) {
        buttonAction = 'plus';
      } else if(e.target.classList.contains('pom-settings__btn--minus')) {
        buttonAction = 'minus';
      }
      _this.modifyOption(clickedField, buttonAction);
      _this.renderOption(clickedField);
      cycle.renderCycle(cycle.calculateOptions(_this.options))
      cycle.renderTopCycleLabels(cycle.calculateOptions(_this.options));
      cycle.renderBottomCycleLabels(cycle.calculateOptions(_this.options));      
    }
  }
}
// module.exports = Settings;