import { Firebase } from './firebase';
export var firebase = new Firebase();
import { Header } from './components/header/header';
export var header = new Header();
header.setScrollListener();
require('assets/less/main.less');

import { ModalController } from './components/modals/modalController';
import {TaskListModel} from './components/task-list/task-list-model';
import {TaskListController} from './components/task-list/task-list-controller';
import {TaskListView} from './components/task-list/task-list-view';
export var taskListView = new TaskListView(); 
export var taskListModel = new TaskListModel(firebase);
var modalView = new ModalView();
var modalController = new ModalController(modalView, taskListModel, taskListView);
var taskListController = new TaskListController(taskListModel, taskListView, modalView);
taskListController.init();

import { PageController } from './components/page/page-controller';
import { PageView } from './components/page/page-view';
import { PageModel } from './components/page/page-model';
export var pageModel = new PageModel();
export var pageView = new PageView();

import { ModalView } from './components/modals/modalView';

var router = require('./router');




checkFirstVisit();


var pageController = new PageController(pageModel, pageView, router);
pageController.setLinksListener();


function checkFirstVisit() {
  if (sessionStorage.visited === undefined) {
    router.navigate('/welcome');
  }
  sessionStorage.setItem('visited', true);
}