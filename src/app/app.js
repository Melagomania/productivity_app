require('./router');
require('./database');

require('./components/settings/settings');
require('assets/less/main.less'); // include general styles


/* example of including header component */
var Header = require('./components/header/header').Header;

import {Settings} from './components/settings/settings';
import {Cycle} from './components/cycle/cycle';

var header = new Header();
header.setScrollListener();


var settings = new Settings();
settings.init(settings.options);
export var cycle = new Cycle();  

cycle.renderCycle(cycle.calculateOptions(settings.options));
cycle.renderTopCycleLabels(cycle.calculateOptions(settings.options));
cycle.renderBottomCycleLabels(cycle.calculateOptions(settings.options));