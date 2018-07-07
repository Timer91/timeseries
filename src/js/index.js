"use strict";

function monthsBetween( d1, d2 ) {
	return ( Date.parse( d2 ) - Date.parse( d1 ) ) /
		( 1000 * 60 * 60 * 24 * 30.4375 ); // <-- days per month in a year
}

const minYear = 2004,
	maxYear = 2020,
	now = new Date().toDateString(),
	elTimeline = document.getElementById( "timelines" ),
	timeline = new Timeline( elTimeline, minYear, maxYear, now ),
	series = new Series( data, elTimeline, minYear ),
	dnd = new DragAndDrop( elTimeline, "drag" );

timeline.render();
series.render();
series.resize( timeline.pxPerMonth() );
dnd.init();

window.onresize = _ => {
	timeline.resize.call( timeline );
	series.resize.call( series, timeline.pxPerMonth() );
	return false;
}
