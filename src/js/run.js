"use strict";

UI.init = function() {
	UI.timeline.init();
	UI.series.init();
	UI.dnd.init();
};

window.onresize = () => {
	UI.timeline.render();
	UI.series.render();
	return false;
}

function run() {
	STORE.has( "shows" )
		? UI.init()
		: TS.betaseries.init().then( UI.init );
}

run();
