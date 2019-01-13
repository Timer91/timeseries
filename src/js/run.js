"use strict";

UI.init = function() {
	UI.timeline.init();
	UI.series.init();
	UI.dnd.init();
};

window.onresize = () => {
	UI.timeline.scale();
	UI.timeline.render();
	UI.series.render();
	return false;
}

function run() {
	if ( STORE.has( "time" ) &&
		!TOOLS.pastDay( STORE.get( "time" ) ) &&
		STORE.has( "shows" ) ) {
		UI.init()
	} else {
		TS.betaseries.init().then( UI.init );
	}
}

run();
