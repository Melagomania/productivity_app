import {Settings} from './components/settings/settings';
import {Cycle} from './components/cycle/cycle';

var firstVisitPage = require('./pages/first-visit/first-visit.hbs');
var settingsHBS = require('./pages/settings/settings.hbs');
var settingsCategorieHBS = require('./pages/settings/settings-categories.hbs');
var timerHBS = require('./pages/timer/timer.hbs');
var taskListHBS = require('./pages/tasks-list/task-list.hbs');
var taskListDoneHBS = require('./pages/tasks-list/task-list-done.hbs');
var reportsHBS = require('./pages/reports/reports.hbs');

var Router = {
  routes: [],
  mode: null,
  root: '/',
  config: function (options) {
    this.mode = options && options.mode && options.mode == 'history' &&
      !!(history.pushState) ? 'history' : 'hash';
    this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
    return this;
  },
  getFragment: function () {
    var fragment = '';
    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      var match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  },
  clearSlashes: function (path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  },
  add: function (re, handler) {
    if (typeof re == 'function') {
      handler = re;
      re = '';
    }
    this.routes.push({
      re: re,
      handler: handler
    });
    return this;
  },
  remove: function (param) {
    for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
      if (r.handler === param || r.re.toString() === param.toString()) {
        this.routes.splice(i, 1);
        return this;
      }
    }
    return this;
  },
  flush: function () {
    this.routes = [];
    this.mode = null;
    this.root = '/';
    return this;
  },
  check: function (f) {
    var fragment = f || this.getFragment();
    for (var i = 0; i < this.routes.length; i++) {
      var match = fragment.match(this.routes[i].re);
      if (match) {
        match.shift();
        this.routes[i].handler.apply({}, match);
        if(!match && i === this.routes.length - 1) {
          this.routes[i].handler.apply({}, 'task-list');
        }
        return this;
      }
    }
    return this;
  },
  listen: function () {
    var self = this;
    var current = self.getFragment();
    var fn = function () {
      if (current !== self.getFragment()) {
        current = self.getFragment();
        self.check(current);
      }
    }
    clearInterval(this.interval);
    this.interval = setInterval(fn, 50);
    return this;
  },

  navigate: function (path) {
    path = path ? path : '';
    if (this.mode === 'history') {
      history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
    }
    return this;
  }
}

Router.config({
  mode: 'history'
});

// returning the user to the initial state
// Router.navigate();

// adding routes
Router
.add(/welcome/, function () {
  document.getElementsByClassName('screen-container')[0].innerHTML = firstVisitPage(); 
})
  .add(/settings\/categories/, function () {
    document.getElementsByClassName('header__menu-link--settings')[0].classList.add('header__menu-link--active');
    document.getElementsByClassName('screen-container')[0].innerHTML = settingsCategorieHBS(); 
  })
  .add(/settings/, function () {
    document.getElementsByClassName('header__menu-link--settings')[0].classList.add('header__menu-link--active');
    document.getElementsByClassName('screen-container')[0].innerHTML = settingsHBS(); 
    
    var cycle = new Cycle();
    var settings = new Settings(cycle);
    settings.init(settings.options);
    cycle.renderCycle(cycle.calculateOptions(settings.options));
    cycle.renderTopCycleLabels(cycle.calculateOptions(settings.options));
    cycle.renderBottomCycleLabels(cycle.calculateOptions(settings.options));
  })
  .add(/task-list\/done/, function () {
    document.getElementsByClassName('screen-container')[0].innerHTML = taskListDoneHBS(); 
    document.getElementsByClassName('header__menu-link--task-list')[0].classList.add('header__menu-link--active');    
  })

  .add(/task-list/, function () {
    document.getElementsByClassName('header__menu-link--task-list')[0].classList.add('header__menu-link--active');
    document.getElementsByClassName('screen-container')[0].innerHTML = taskListHBS();     
  })
  .add(/timer/, function () {
    document.getElementsByClassName('screen-container')[0].innerHTML = timerHBS();     
  }).add(/reports/, function () {
    document.getElementsByClassName('header__menu-link--reports')[0].classList.add('header__menu-link--active');
    document.getElementsByClassName('screen-container')[0].innerHTML = reportsHBS();     
  })
  .add(function () {
    Router.navigate('/task-list').check();  
  })
  .check().listen();

// forwarding
// Router.navigate('/settings');

module.exports = Router;
