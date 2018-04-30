var router = require('./router');
require('./database');
require('assets/less/main.less'); // include general styles
var Header = require('./components/header/header').Header;
import {Settings} from './components/settings/settings';
import {Cycle} from './components/cycle/cycle';

var header = new Header();
header.setScrollListener();

checkFirstVisit();


function checkFirstVisit() {
  if(sessionStorage.visited === undefined) {
    router.navigate('/welcome');
  }
  sessionStorage.setItem('visited', true);
}