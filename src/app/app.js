import { Header } from './components/header/header';
export var header = new Header();
header.setScrollListener();
require('assets/less/main.less');

import { PageController } from './components/page/page-controller';
import { PageView } from './components/page/page-view';
import { PageModel } from './components/page/page-model';

export var pageModel = new PageModel();
export var pageView = new PageView();
var router = require('./router');
var pageController = new PageController(1, 2, router);
pageController.setLinksListener();


import { ModalController } from './components/modals/modalController';
import { ModalView } from './components/modals/modalView';

import { Firebase } from './firebase';

export var firebase = new Firebase();

checkFirstVisit();

import {TaskListModel} from './components/task-list/task-list-model';

var taskListModel = new TaskListModel(firebase);


var modalView = new ModalView();
var modalController = new ModalController(modalView);

function checkFirstVisit() {
  if (sessionStorage.visited === undefined) {
    router.navigate('/welcome');
  }
  sessionStorage.setItem('visited', true);
}