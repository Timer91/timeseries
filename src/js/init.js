"use strict";

const MONTH_DUR = 1000 * 60 * 60 * 24 * 30.4375; // timestamp of a month duration 

const TS = {
	start: 2004,
	end: 2020,
	now: new Date().toDateString(),
};

const UI = {
	wrap: document.getElementById( "timelines" )
}

const STORE = {
	get: ( id ) => {
		if ( STORE.has( id ) ) {
			return JSON.parse( localStorage[ id ] );
		}
	},
	set: ( id, d ) => {
		localStorage.setItem( id, JSON.stringify( d ) );
	},
	remove: ( id ) => {
		localStorage.removeItem( id );
	},
	has: ( id ) => {
		return localStorage.hasOwnProperty( id );
	}
};

const TOOLS = {
	monthsBetween: ( a, b ) =>
		( Date.parse( b ) - Date.parse( a ) ) / MONTH_DUR,
	monthPx: () =>
		( UI.wrap.offsetWidth / TOOLS.monthsBetween( TS.start, TS.end ) ),
}

TS.colors = new Map([
	[ "Better Call Saul", "#627a0e" ],
	[ "Billions", "#9b59b6" ],
	[ "Breaking Bad", "#f39c12" ],
	[ "Fear the Walking Dead", "#c0392b" ],
	[ "Game of Thrones", "#27ae60" ],
	[ "House", "#ea6027" ],
	[ "House of Cards (US)", "#0e627a" ],
	[ "Mr. Robot", "#2980b9" ],
	[ "Narcos", "" ],
	[ "Narcos: Mexico", "" ],
	[ "The Rain", "" ],
	[ "The Walking Dead", "" ],
	[ "YOU", "" ],
]);

window.TS = TS;
window.STORE = STORE;
window.TOOLS = TOOLS;
window.UI = UI;
