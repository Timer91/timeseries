"use strict";

TS.betaseries = {
	init() {
		this.API_KEY = "0ae925cd365a";
		this.LOGIN = "Timeseries";
		this.PASS = "6742334107ab742a1d675bf51f0b6ac9";
		this.headers = new Headers({
			"X-BetaSeries-Version": "3.0",
			"X-BetaSeries-Key": this.API_KEY,
		});

		return this.connection()
			.then( () => this.getMemberShows() )
			.then( () => this.getShowEpisodes() )
			.then( () => this.cleanShows() );
	},

	// store the return of connection request
	connection() {
		return fetch( `https://api.betaseries.com/members/auth
			?login=${this.LOGIN}&password=${this.PASS}`, {
				method: "POST",
				headers: this.headers,
		})
		.then( res => res.json() )
		.then( res => STORE.set( "session", res ) );
	},

	// store an object of shows => { {show}, ...}
	getMemberShows() {
		const s = STORE.get( "session" );

		return fetch( `https://api.betaseries.com/shows/member?id=${s.user.id}`, {
			method: "GET",
			headers: this.headers,
		})
		.then( res => res.json() )
		.then( res => STORE.set( "shows", res.shows ) )
		.then( res => STORE.set( "time", new Date().toString() ) );
	},
	
	// store a Map of shows' episodes => Map( [ [ show.id, [ {ep}, ...] ], ...] )
	getShowEpisodes() {
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
	
	// keep and format the necessary information about episodes
	cleanEpisodes( eps ) {
		return eps
			.filter( ep => ep.special !== 1 )
			.sort( ( a, b ) => a.global > b.global ? 1 : a.global < b.global ? -1 : 0 )
			.reduce( ( seasons, ep ) => {
				if ( ep.season in seasons ) {
					seasons[ ep.season ].episodes.push( ep );
					seasons[ ep.season ].lastAired = ep.date;
				} else {
					seasons[ ep.season ] = {
						episodes : [ ep ],
						firstAired: ep.date,
						lastAired: "",
					};
				}
				return seasons;
			}, {} );
	},

	// format data in a stored shows Map
	cleanShows() {
		const shows = STORE.get( "shows" ),
			showsEps = STORE.get( "episodes" ),
			data = showsEps.reduce( ( data, [ id, eps ] ) => {
				data.set( id, this.cleanEpisodes( eps ) );
				return data;
			}, new Map() );

		shows.forEach( ( s, i ) => s.seasons = data.get( +s.id ) );
		STORE.set( "shows", Array.from( shows.map( s => [ s.id, s ] ) ) ); // save shows as Map()
		STORE.remove( "episodes" );
	},
}
