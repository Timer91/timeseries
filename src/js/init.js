"use strict";

const TS = {
	start: 2004,
	end: 2020,
	now: new Date().toDateString(),
};

const UI = {
	wrap: document.getElementById( "timelines" )
}

const STORE = {
	get( id ) {
		if ( STORE.has( id ) ) {
			return JSON.parse( localStorage[ id ] );
		}
	},
	set( id, d ) {
		localStorage.setItem( id, JSON.stringify( d ) );
	},
	remove( id ) {
		localStorage.removeItem( id );
	},
	has( id ) {
		return localStorage.hasOwnProperty( id );
	}
}

const TOOLS = {
	monthDur: 1000 * 60 * 60 * 24 * 30.4375, // timestamp of a month duration
	monthsBetween( a, b ) {
		return ( Date.parse( b ) - Date.parse( a ) ) / this.monthDur;
	},
	monthPx() {
		return UI.wrap.offsetWidth / TOOLS.monthsBetween( TS.start, TS.end );
	}
}

TS.colors = new Map([
	[ "Netflix", "#e50914" ],
	[ "AMC", "#e7e198" ],
	[ "HBO", "#2cb0d8" ],
	[ "FOX (US)", "#002486" ],
	[ "Univision", "#42d07c" ],
	[ "USA Network", "#400195" ],
	[ "Showtime", "#b00100" ],
]);

window.TS = TS;
window.STORE = STORE;
window.TOOLS = TOOLS;
window.UI = UI;
