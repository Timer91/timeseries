"use strict";

TS.betaseries.init().then( () => {
	TS.timeline.init();
	TS.series.init();
	TS.dnd.init();
});

window.onresize = _ => {
	TS.timeline.render();
	TS.series.render();
	return false;
}


