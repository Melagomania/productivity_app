export function routerModule(injections) {
  let Router = {
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
      let fragment = '';
      if (this.mode === 'history') {
        fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
      } else {
        let match = window.location.href.match(/#(.*)$/);
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
      for (let i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
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
      let fragment = f || this.getFragment();
      for (let i = 0; i < this.routes.length; i++) {
        let match = fragment.match(this.routes[i].re);
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
      let self = this;
      let current = self.getFragment();
      let fn = function () {
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
      injections.header.toggleCurrentLink();
      injections.pageModel.setCurrentScreen('welcome');
      injections.pageView.renderScreen(injections.pageModel.getCurrentScreen());
    })
    .add(/settings\/categories/, function () {
      injections.header.toggleCurrentLink('settings');
      injections.pageModel.setCurrentScreen('settings-categories');
      injections.pageView.renderScreen(injections.pageModel.getCurrentScreen());
    })
    .add(/settings/, function () {
      injections.header.toggleCurrentLink('settings');
      injections.pageModel.setCurrentScreen('settings');
      injections.pageView.renderScreen(injections.pageModel.getCurrentScreen());

      injections.settings.renderSettingsFieldsInputs();
      injections.cycle.calculateOptions(injections.settings.options);
      injections.cycle.getCycleElements();
      injections.cycle.renderCycle(injections.cycle.renderConfig);
    })
    .add(/task-list\/done/, function () {
      injections.header.toggleCurrentLink('task-list');
      injections.pageModel.setCurrentScreen('task-list-done');
      injections.pageView.renderScreen(injections.pageModel.getCurrentScreen());

      injections.taskListModel.getDoneTasks();
      injections.taskListView.renderDoneTaskList(injections.taskListModel.doneTasks);
    })

    .add(/task-list/, function () {
      injections.header.toggleCurrentLink('task-list');
      injections.pageModel.setCurrentScreen('task-list');
      injections.pageView.renderScreen(injections.pageModel.getCurrentScreen());

      injections.taskListModel.sortTasksByCategories();
      injections.taskListModel.getTodayTasks();

      injections.taskListView.renderGlobalTaskList(injections.taskListModel);
      injections.taskListView.renderDailyTaskList(injections.taskListModel);
    })
    .add(/timer/, function (e) {
      injections.header.toggleCurrentLink('task-list');
      injections.pageModel.setCurrentScreen('timer');
      injections.pageView.renderScreen(injections.pageModel.getCurrentScreen());
      injections.timerController.openTimer();
    })
    .add(/reports/, function () {
      injections.header.toggleCurrentLink('reports');
      injections.pageModel.setCurrentScreen('reports');
      injections.pageView.renderScreen(injections.pageModel.getCurrentScreen());

    })
    .add(function () {
      Router.navigate('/task-list').check();
    })
    .check().listen();

  return Router;
}
