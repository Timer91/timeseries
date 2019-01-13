"use strict";

UI.init = function() {
	UI.timeline.init();
	UI.series.init();
	UI.dnd.init();
};

UI.resize = function() {
	this.timeline.scale();
	this.timeline.render();
	this.series.render();
	return false;
}

function run() {
	window.onresize = UI.resize.bind( UI );

	if ( STORE.has( "time" ) &&
		!TOOLS.pastDay( STORE.get( "time" ) ) &&
		STORE.has( "shows" ) ) {
		UI.init()
	} else {
		TS.betaseries.init().then( UI.init );
	}
}

run();
