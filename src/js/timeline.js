"use strict";

TS.timeline = {
	init: function() {
		this._color = {
			now: "rgba( 255, 255, 255, .3 )",
			year: "rgba( 0, 0, 0, .5 )",
			month: "rgba( 0, 0, 0, .2 )"
		};

		this.render();
	},

	// private:
	render: function() {
		const el = TS.container,
			monthPx = TS.pxPerMonth(),
			nDays = TS.howManyMonths( TS.start, TS.now ),
			steps = [
				`<rect x='0' height='1px' width='1px'
					fill='${ this._color.year }'/>`, // first line
				`<rect height='1px' width='3px' x='${ monthPx * nDays }'
					fill='${ this._color.now }'/>` ]; // current date

		el.style.backgroundSize = `${el.offsetWidth}px 1px`;
		for ( let month = 1; month < TS.nbMonths; ++month ) {
			steps.push( `<rect height='1px' width='1px'
				x='${monthPx * month}' fill='${
				month % 12 ? this._color.month : this._color.year}' />` );
		}
		el.style.backgroundImage = `url("${ encodeURI(
			"data:image/svg+xml,<svg preserveAspectRatio='none' " +
			"xmlns='http://www.w3.org/2000/svg'" +
			` viewBox='0 0 ${el.offsetWidth} 1'>` +
			`${steps.join( " " ) }</svg>` )}")`;
	}
}
