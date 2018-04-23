require('./router');

require('./components/settings/settings');

/* example of including header component */
require('./components/header/header');

import {Settings} from './components/settings/settings';
import {Cycle} from './components/cycle/cycle';


var settings = new Settings();
settings.init(settings.options);
export var cycle = new Cycle();  

cycle.renderCycle(cycle.calculateOptions(settings.options));
cycle.renderTopCycleLabels(cycle.calculateOptions(settings.options));
cycle.renderBottomCycleLabels(cycle.calculateOptions(settings.options));