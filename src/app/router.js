import {settings} from './app';
import {cycle} from './app';


import {header} from './app';
import {pageModel} from './app';
import {pageView} from './app';

import {taskListModel} from './app';
import {taskListView} from './app';

import {timerController} from './app';



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
        if (!match && i === this.routes.length - 1) {
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

Router
  .add(/welcome/, function () {
    header.toggleCurrentLink();
    pageModel.setCurrentScreen('welcome');
    pageView.renderScreen(pageModel.getCurrentScreen());
  })
  .add(/settings\/categories/, function () {
    header.toggleCurrentLink('settings');
    pageModel.setCurrentScreen('settings-categories');
    pageView.renderScreen(pageModel.getCurrentScreen());
  })
  .add(/settings/, function () {
    header.toggleCurrentLink('settings');
    pageModel.setCurrentScreen('settings');
    pageView.renderScreen(pageModel.getCurrentScreen());

    settings.init(settings.options);
    cycle.init();
    cycle.renderCycle(cycle.calculateOptions(settings.options));
    cycle.renderTopCycleLabels(cycle.calculateOptions(settings.options));
    cycle.renderBottomCycleLabels(cycle.calculateOptions(settings.options));
  })
  .add(/task-list\/done/, function () {
    header.toggleCurrentLink('task-list');
    pageModel.setCurrentScreen('task-list-done');
    pageView.renderScreen(pageModel.getCurrentScreen());

    taskListModel.getDoneTasks();
    taskListView.renderDoneTaskList(taskListModel.doneTasks);
  })

  .add(/task-list/, function () {
    header.toggleCurrentLink('task-list');
    pageModel.setCurrentScreen('task-list');
    pageView.renderScreen(pageModel.getCurrentScreen());

    taskListModel.sortTasksByCategories();
    taskListModel.getTodayTasks();

    taskListView.renderGlobalTaskList(taskListModel);
    taskListView.renderDailyTaskList(taskListModel);
  })
  .add(/timer/, function (e) {
    header.toggleCurrentLink('task-list');
    pageModel.setCurrentScreen('timer');
    pageView.renderScreen(pageModel.getCurrentScreen());

    timerController.openTimer();
  })
  .add(/reports/, function () {
    header.toggleCurrentLink('reports');
    pageModel.setCurrentScreen('reports');
    pageView.renderScreen(pageModel.getCurrentScreen());

  })
  .add(function () {
    Router.navigate('/task-list').check();
  })

  .check().listen();

module.exports = Router;
