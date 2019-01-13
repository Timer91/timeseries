"use strict";

UI.timeline = {
	init() {
		this._colors = {
			now: "rgba( 255, 255, 255, .3 )",
			year: "rgba( 0, 0, 0, .5 )",
			month: "rgba( 0, 0, 0, .2 )"
		};

		this.scale();
		this.render();
	},

	scale() {
		const years = TS.end - TS.start;

		for ( let y = 0 ; y <= years ; ++y ) {
			const el = UI.scale.children[ y ]
				||document.createElement( "span" ),
				left = TOOLS.monthPx() * 12 * y,
				fix = 26.7 / 2; // tmp

			el.style.left = left -
				( y > 0 ? ( y === years ? 2 * fix : fix ) : 0 ) + "px";
			if ( UI.scale.children.length <= years ) {
				el.classList.add( "scale-year" );
				el.innerHTML = TS.start + y;
				UI.scale.append( el );
			}
		}
	},

	render() {
		const el = UI.wrap,
			m1 = TOOLS.monthsBetween( TS.start, TS.end ),
			m2 = TOOLS.monthsBetween( TS.start, TS.now ),
			monthPx = TOOLS.monthPx(),
			steps = [
				`<rect x='0' height='1px' width='1px'
					fill='${ this._colors.year }'/>`, // first line
				`<rect height='1px' width='3px' x='${ monthPx * m2 }'
					fill='${ this._colors.now }'/>` ]; // current date

		el.style.backgroundSize = `${el.offsetWidth}px 1px`;
		for ( let month = 1; month < m1; ++month ) {
			steps.push( `<rect height='1px' width='1px'
				x='${monthPx * month}' fill='${
				month % 12 ? this._colors.month : this._colors.year}' />` );
		}
		el.style.backgroundImage = `url("${ encodeURI(
			"data:image/svg+xml,<svg preserveAspectRatio='none' " +
			"xmlns='http://www.w3.org/2000/svg'" +
			` viewBox='0 0 ${el.offsetWidth} 1'>` +
			`${steps.join( " " ) }</svg>` )}")`;
	}
}
