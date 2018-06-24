"use strict";

class Series {
	constructor( data, el, minYear ) {
		this.series = data;
		this.rootElement = el;
		this.minYear = minYear;
		this.setOrder( Object.keys( this.series ) );
	}

	getOrder() {
		return localStorage.order.split( ',' );
	} 
	setOrder( order ) {
		localStorage.hasOwnProperty( "order" ) || localStorage.setItem( "order", order );
	}
	resize( pxPerMonth ) {
		const pxPerWeek = pxPerMonth * 12 / 52,
			order = this.getOrder();

		order.forEach( id => {
			const elSeasons = document
					.querySelectorAll( "div[name=" + id + "] .season" );
			this.series[ id ].seasons.forEach( ( s, i ) => { 
				const sMonth = monthsBetween( this.minYear, s.firstAired );

				elSeasons[ i ].style.width = pxPerWeek * s.nbEpisodes + "px";
				elSeasons[ i ].style.left = sMonth * pxPerMonth + "px";
			} )
		});
	}
	render() {
		this._render();
	}

	// private
	_createSerie( sId ) {
		const serie = this.series[ sId ],
			elSerie = document.createElement( "div" ),
			elTitle = document.createElement( "div" );

		serie.seasons.forEach( s => {
			const elSeason = document.createElement( "div" );

			elSeason.classList.add( "season" );;
			elSerie.appendChild( elSeason );
		});
		elTitle.classList.add( "title" );
		elTitle.innerHTML = serie.title;
		elSerie.classList.add( "serie" );
		elSerie.setAttribute( "name", sId );
		elSerie.setAttribute( "draggable", true );
		elSerie.appendChild( elTitle );
		this.rootElement.appendChild( elSerie );
	}
	_render() {
		this.rootElement.innerHTML = "";
		this.getOrder().forEach( sId => {
			this.series.hasOwnProperty( sId ) && this._createSerie( sId );
		});
	}
}
