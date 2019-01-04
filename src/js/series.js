"use strict";

TS.series = {
	init: function() {
		this.rootEl = TS.container;

		this.setOrder( Object.keys( TS.data ) );
		this._generate();
		this.render();
	},

	getOrder() {
		return localStorage.order.split( ',' );
	},
	setOrder( order ) {
		localStorage.hasOwnProperty( "order" ) || localStorage.setItem( "order", order );
	},

	render() {
		const pxMonth = TS.pxPerMonth(),
			pxWeek = pxMonth * 12 / 52;

		this.getOrder().forEach( id => {
			const els = document.querySelectorAll( `[name="${id}"] .season` ),
				seasons = TS.data[ id ].seasons;
			let w = 0, l = 0, m = 0;

			els.forEach( ( el, i ) => {
				const s = seasons[ i ];

				m = TS.howManyMonths( TS.start, s.firstAired );
				w = pxWeek * s.nbEpisodes + "px";
				l = m * pxMonth + "px";
				el.style.width = w;
				el.style.left = l;
			} )
		});
	},

	// private
	_generate() {
		this.rootEl.innerHTML = "";
		this.getOrder().forEach( sId => {
			TS.data.hasOwnProperty( sId ) && this._createSerie( sId );
		});
	},
	_createSerie( sId ) {
		const serie = TS.data[ sId ],
			template = document.querySelector( "#serie" ),
			elSerie = template.content.children[ 0 ].cloneNode( true ),
			elTitle = elSerie.querySelector( ".title" );

		serie.seasons.forEach( s => {
			const elSeason = document.createElement( "div" );

			elSeason.classList.add( "season" );
			elSerie.prepend( elSeason );
		});
		elSerie.setAttribute( "name", sId );
		elTitle.innerHTML = serie.title;
		this.rootEl.append( elSerie );
	},
}
