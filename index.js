function createSeason( timeline ) {
	const pxPerMonth = timeline.pxPerMonth(),
		pxPerWeek = pxPerMonth * 12 / 52;

	timeline.rootElement.innerHTML = "";
	Object.entries( series ).forEach( function( serie ) {
		const elTitle = document.createElement( "div" ),
			elSerie = document.createElement( "div" );

		elTitle.classList.add( "title" );
		elTitle.innerHTML = serie[ 0 ];

		serie[ 1 ].seasons.forEach( function( s ) {
			const elSeason = document.createElement( "div" ),
				sMonth = timeline.monthsBetween( minYear, s.firstAired );

			elSeason.classList.add( "season" );
			elSeason.style.width = pxPerWeek * s.nbEpisodes + "px";
			elSeason.style.left = sMonth * pxPerMonth + "px";
			elSerie.appendChild( elSeason );
			elSerie.appendChild( elTitle );
		});

		elSerie.classList.add( "serie" );
		timeline.rootElement.appendChild( elSerie );
	});
}

window.onresize = function() {
	timeline.resize.call( timeline );
	createSeason( timeline );
}

const minYear = 2005,
	maxYear = 2020,
	elTimeline = document.getElementById( "timelines" ),
	timeline = new Timeline( elTimeline, minYear, maxYear,
		new Date().toDateString() );

timeline.render();
createSeason( timeline );

