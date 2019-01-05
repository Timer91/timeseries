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
		this.session = null;
		this.shows = null;

		return this.connection()
			.then( () => {
				if ( this.session ) {
					return this.getMemberShows()
						.then( () => this.getShowEpisodes() )
						.then( () => this.filterShow() );
				}
			});
	},

	connection: function() {
		return fetch( `https://api.betaseries.com/members/auth
			?login=${this.LOGIN}&password=${this.PASS}`, {
				method: "POST",
				headers: this.headers,
		})
		.then( res => res.json() )
		.then( res => this.session = res );
	},
	getMemberShows: function() {
		return fetch( `https://api.betaseries.com/shows/member?id=${this.session.user.id}`, {
			method: "GET",
			headers: this.headers,
		})
		.then( res => res.json() )
		.then( res => this.shows = res.shows );
	},
	getShowEpisodes: function() {
		const promises = [];

		this.shows.forEach( ( s, i ) => {
			const p = fetch( `https://api.betaseries.com/shows/episodes?id=${s.id}`, {
				method: "GET",
				headers: this.headers,
			})
			.then( res => res.json() )
			.then( res => { this.shows[ i ][ "episodes" ] = res.episodes } )
			promises.push( p );
		});
		return Promise.all( promises );
	},
	filterShow: function() {
		const shows = new Map();

		this.shows.forEach( ( s, i ) => {
			const show = {
				title: s.title,
				network: s.network,
				seasons: s.seasons_details
			};
			s.episodes.forEach( ( e, i ) => {
				if ( e.episode === 1 ) {
					show.seasons[ e.season - 1 ][ "firstAired" ] = e.date;
				}
			})
			shows.set( s.id, show );
		})
	}
}
