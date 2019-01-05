"use strict";

let shows = null;

TS.betaseries = {
	init: function() {
		this.API_KEY = "0ae925cd365a";
		this.LOGIN = "Timeseries";
		this.PASS = "6742334107ab742a1d675bf51f0b6ac9";
		this.headers = new Headers({
			"X-BetaSeries-Version": "3.0",
			"X-BetaSeries-Key": this.API_KEY,
		});

		return this.connection()
			.then( () => {
				return this.getMemberShows()
					.then( () => this.getShowEpisodes() )
					.then( () => this.cleanShows() );
			})
	},

	connection: function() {
		return fetch( `https://api.betaseries.com/members/auth
			?login=${this.LOGIN}&password=${this.PASS}`, {
				method: "POST",
				headers: this.headers,
		})
		.then( res => res.json() )
		.then( res => STORE.set( "session", res ) );
	},
	getMemberShows: function() {
		const s = STORE.get( "session" );

		return fetch( `https://api.betaseries.com/shows/member?id=${s.user.id}`, {
			method: "GET",
			headers: this.headers,
		})
		.then( res => res.json() )
		.then( res => STORE.set( "shows", res.shows ) );
	},
	getShowEpisodes: function() {
		const promises = [],
			shows = STORE.get( "shows" ),
			episodes = new Map();

		shows.forEach( ( s, i ) => {
			const p = fetch( `https://api.betaseries.com/shows/episodes?id=${s.id}`, {
				method: "GET",
				headers: this.headers,
			})
			.then( res => res.json() )
			.then( res => { episodes.set( s.id, res.episodes ) } );
			promises.push( p );
		});
		return Promise.all( promises )
			.then( () => STORE.set( "episodes", Array.from( episodes ) ) );
	},
	cleanShows: function() {
		const oldShows = STORE.get( "shows" ),
			episodes = new Map( STORE.get( "episodes" ) ),
			shows = new Map();

		oldShows.forEach( ( s, i ) => {
			const sEps = episodes.get( +s.id ),
				show = {
					title: s.title,
					network: s.network,
					seasons: s.seasons_details
				};

			sEps.forEach( ( e, i ) => {
				if ( e.episode === 1 ) {
					show.seasons[ e.season - 1 ][ "firstAired" ] = e.date;
				}
			})
			shows.set( s.id, show );
		})
		STORE.set( "shows", Array.from( shows ) );
		STORE.remove( "episodes" );
	},
}
