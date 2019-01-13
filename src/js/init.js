"use strict";

const TS = {
	start: 2004,
	end: new Date().getFullYear() + 1,
	now: new Date().toDateString(),
};

const UI = {
	scale: document.getElementById( "scale" ),
	wrap: document.getElementById( "timeline" )
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
	},
	clear() {
		localStorage.clear();
	}
}

const TOOLS = {
	dayDur: 1000 * 60 * 60 * 24,
	monthDur: 1000 * 60 * 60 * 24 * 30.4375,
	monthsBetween( a, b ) {
		return ( Date.parse( b ) - Date.parse( a ) ) / this.monthDur;
	},
	pastDay( a ) {
		return ( new Date() - Date.parse( a ) ) >= this.dayDur;
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
