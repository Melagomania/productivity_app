var router = require('./router');
require('assets/less/main.less'); // include general styles
var Header = require('./components/header/header').Header;
import {Settings} from './components/settings/settings';
import {Cycle} from './components/cycle/cycle';

import {ModalController} from './components/modals/modalController';
import {ModalView} from './components/modals/modalView';

import {Firebase} from './firebase';

export var firebase = new Firebase();
firebase.getTasksFromDB();
checkFirstVisit();
var header = new Header();
header.setScrollListener();

var modalView = new ModalView();
var modalController = new ModalController(modalView);

function checkFirstVisit() {
  if(sessionStorage.visited === undefined) {
    router.navigate('/welcome');
  }
  sessionStorage.setItem('visited', true);
}