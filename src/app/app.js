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

require('assets/less/main.less');


export let firebase = new Firebase();
export let header = new Header();
header.setScrollListener();


export let cycle = new Cycle();
export let settings = new Settings(cycle);

export let taskListView = new TaskListView();
export let taskListModel = new TaskListModel();

let modalView = new ModalView();
let modalController = new ModalController(modalView);
let taskListController = new TaskListController(taskListModel, taskListView, modalController);
taskListController.init();
modalController.init();



export let pageModel = new PageModel();
export let pageView = new PageView();



let timerView = new TimerView(settings.options);
let timerModel = new TimerModel(taskListModel);
timerModel.addObserver(header);
export let timerController = new TimerController(timerModel, timerView, settings.options);
timerController.init();


let router = require('./router');
let pageController = new PageController(pageModel, pageView, router);
pageController.init();

checkFirstVisit();
function checkFirstVisit() {
  if (sessionStorage.visited === undefined) {
    router.navigate('/welcome');
  }
  sessionStorage.setItem('visited', true);
}
