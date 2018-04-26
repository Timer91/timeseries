const elTimelines = document.getElementById( "timelines" );

let minYear = 2005,
	maxYear = 2020;

/* get timestamp */
function t( date ) {
	return ( new Date( date.toString() ).getTime() );
}

const timeDuration = ( t( maxYear ) - t( minYear ) );

Object.entries( series ).forEach( function( serie ) {
	const elTitle = document.createElement( "div" ),
		elSerie = document.createElement( "div" );

	elTitle.classList.add( "title" );
	elTitle.innerHTML = serie[ 0 ];

	serie[ 1 ].seasons.forEach( function( s ) {
		const elSeason = document.createElement( "div" ),
			sDuration = t( s.lastAired ) - t( s.firstAired ); // season timestamp

		elSeason.classList.add( "season" );
		elSeason.style.width = `${ sDuration / timeDuration * 100 }%`;
		elSeason.style.left = `${ ( t( s.firstAired ) - t( minYear ) ) / timeDuration * 100}%`;

		elSerie.appendChild( elSeason );
		elSerie.appendChild( elTitle );
	});

	elSerie.classList.add( "serie" );
	elTimelines.appendChild( elSerie );
});
