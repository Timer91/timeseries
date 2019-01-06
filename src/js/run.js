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
	if ( STORE.has( "time" ) &&
		!TOOLS.pastDay( STORE.get( "time" ) ) ) {
		UI.init()
	} else {
		STORE.clear();
		TS.betaseries.init().then( UI.init );
	}
}

run();
