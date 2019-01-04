"use strict";

const MONTH_DUR = 1000 * 60 * 60 * 24 * 30.4375; // timestamp of a month duration 

const TS = {
	start: 2004,
	end: 2020,
	data: data,
	now: new Date().toDateString(),
	container: document.getElementById( "timelines" ),
	nbMonths: () => ( this.end - this.start ) * 12,
	howManyMonths: ( d1, d2 ) =>
		( Date.parse( d2 ) - Date.parse( d1 ) ) / MONTH_DUR,
	pxPerMonth: function() {
		return this.container.offsetWidth / this.nbMonths; }
};

TS.nbMonths = ( TS.end - TS.start ) * 12;

window.TS = TS;
