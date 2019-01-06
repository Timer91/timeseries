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
			pxMonth = TOOLS.monthPx();

		order.forEach( id => {
			const els = document.querySelectorAll( `[name="${id}"] .season` ),
				seasons = this.shows.get( +id ).seasons;
			let w = 0, l = 0, m = 0;

			els.forEach( ( el, i ) => {
				const s = seasons[ i + 1 ];

				m = TOOLS.monthsBetween( TS.start, s.firstAired );
				w = pxMonth * TOOLS.monthsBetween( s.firstAired, s.lastAired ) + "px";
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
		this.rootEl.innerHTML = "";
		STORE.get( "order" )
			.forEach( id => { this._newElem( this.shows.get( +id ) ) } );
	},
	_newElem( show ) {
		const template = document.querySelector( "#serie" ),
			elRoot = template.content.children[ 0 ].cloneNode( true ),
			elTitle = elRoot.querySelector( ".title" );

		Object.keys( show.seasons ).forEach( s => {
			const el = document.createElement( "div" );

			el.style.borderColor = TS.colors.get( show.network );
			el.classList.add( "season" );
			elRoot.prepend( el );
		});
		elRoot.setAttribute( "name", show.id );
		elTitle.innerHTML = show.title;
		this.rootEl.append( elRoot );
	},
}
