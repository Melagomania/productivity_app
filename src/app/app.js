import {Firebase} from './firebase';
import {Header} from './components/header/header';
import {TaskListController} from './components/task-list/task-list-controller';
import {TaskListModel} from './components/task-list/task-list-model';
import {TaskListView} from './components/task-list/task-list-view';
import {ModalController} from './components/modals/modalController';
import {ModalView} from './components/modals/modalView';
import {PageView} from './components/page/page-view';
import {PageModel} from './components/page/page-model';
import {PageController} from './components/page/page-controller';
import {Settings} from './components/settings/settings';
import {Cycle} from './components/cycle/cycle';
import {TimerModel} from './components/timer/timer-model';
import {TimerController} from './components/timer/timer-controller';
import {TimerView} from './components/timer/timer-view';
import {ReportsView} from './components/reports/reports-view';
import {ReportsController} from './components/reports/reports-controller';
import {ReportsModel} from './components/reports/reports-model';
import {routerModule} from './router';


require('assets/less/main.less');

let firebase = new Firebase();

let header = new Header();
header.setScrollListener();


let cycle = new Cycle();
let settings = new Settings(cycle);
settings.addObserver(cycle);
settings.init();
cycle.calculateOptions(settings.options);

let modalView = new ModalView();
let modalController = new ModalController(modalView);

let taskListView = new TaskListView();
let taskListModel = new TaskListModel();
let taskListController = new TaskListController(taskListModel, taskListView, modalController);

//same event handlers in taskListController and modalController
taskListController.init();
modalController.init();


let timerView = new TimerView(settings.options);
let timerModel = new TimerModel(taskListModel);
let timerController = new TimerController(timerModel, timerView, settings.options);

timerModel.addObserver(header);
timerController.init();

let reportsView = new ReportsView();
let reportsModel = new ReportsModel();
let reportsController = new ReportsController(reportsModel, reportsView);


let pageModel = new PageModel();
let pageView = new PageView();


let router = routerModule({
  settings: settings,
  cycle: cycle,
  header: header,
  pageModel: pageModel,
  pageView: pageView,
  taskListModel: taskListModel,
  taskListView: taskListView,
  timerController: timerController,
  reportsController: reportsController
});


let pageController = new PageController(pageModel, pageView, router);
pageController.init();

checkFirstVisit();

function checkFirstVisit() {
  if (sessionStorage.visited === undefined) {
    router.navigate('/welcome');
  }
  sessionStorage.setItem('visited', true);
}
