"use strict";

UI.series = {
	init: function() {
		this.rootEl = UI.wrap;
		this.shows = new Map( STORE.get( "shows" ) );

		this._initOrder();
		this._display();
		this.render();
	},

	render() {
		const order = STORE.get( "order" ),
			pxMonth = TOOLS.monthPx(),
			pxWeek = pxMonth * 12 / 52;

		order.forEach( id => {
			const els = document.querySelectorAll( `[name="${id}"] .season` ),
				seasons = this.shows.get( +id ).seasons;
			let w = 0, l = 0, m = 0;

			els.forEach( ( el, i ) => {
				const s = seasons[ i ];

				m = TOOLS.monthsBetween( TS.start, s.firstAired );
				w = pxWeek * s.episodes + "px";
				l = m * pxMonth + "px";
				el.style.width = w;
				el.style.left = l;
			} )
		});
	},

	// private
	_initOrder() {
		STORE.has( "order" ) ||
		STORE.set( "order", Array.from( this.shows.keys() ) );
	},
	_display() {
		const order = STORE.get( "order" );

		this.rootEl.innerHTML = "";
		order.forEach( sId => {
			this.shows.get( +sId ) && this._newElem( +sId );
		});
	},
	_newElem( sId ) {
		const serie = this.shows.get( +sId ),
			template = document.querySelector( "#serie" ),
			el = template.content.children[ 0 ].cloneNode( true ),
			elTitle = el.querySelector( ".title" );

		serie.seasons.forEach( s => {
			const elSeason = document.createElement( "div" );

			elSeason.style.borderColor = TS.colors.get( serie.title );
			elSeason.classList.add( "season" );
			el.prepend( elSeason );
		});
		el.setAttribute( "name", sId );
		elTitle.innerHTML = serie.title;
		this.rootEl.append( el );
	},
}
