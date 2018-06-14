"use strict";

class Timeline {
	constructor( el, start, end, cur ) {
		this.rootElement = el;
		this._years = { 
			start, end, cur,
			inMonth: ( end - start ) * 12 };
		this._color = {
			cur: "rgba( 221, 204, 51, .8 )",
			year: "rgba( 0, 0, 0, .5 )",
			month: "rgba( 0, 0, 0, .2 )" }
		this._viewBox = this.rootElement.offsetWidth;
	}

	monthsBetween( d1, d2 ) {
		return ( Date.parse( d2 ) - Date.parse( d1 ) ) /
			( 1000 * 60 * 60 * 24 * 30.4375 ); // <-- days per month in a year
	}
	pxPerMonth() {
		return this._viewBox / this._years.inMonth;
	}
	resize() {
		this._viewBox = this.rootElement.offsetWidth;
		this.rootElement.style.backgroundSize = `${ this._viewBox }px 1px`;
		this.render();
	}
	render() {
		this._render();
	}

	// private:
	_render() {
		const el = this.rootElement,
			monthPx = this.pxPerMonth(),
			curMonth = this.monthsBetween( this._years.start, this._years.cur ),
			steps = [ `<rect x='0' height='1px' width='1px' fill='${ this._color.year }'/>`,
			, `<rect height='1px' width='1px' x='${ monthPx * curMonth }' fill='${ this._color.cur }'/>` ];

		for ( let month = 1; month < this._years.inMonth; ++month ) {
			steps.push( `<rect height='1px' width='1px' x='${ monthPx * month }' 
				fill='${ month % 12 ? this._color.month : this._color.year }' />` );
		}
		el.style.backgroundImage = `url("${ encodeURI(
			"data:image/svg+xml,<svg preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'" +
			` viewBox='0 0 ${ this._viewBox } 1'>${ steps.join( " " ) }</svg>`
		) }")`;
		el.style.backgroundSize = `${ this._viewBox }px 1px`;
	}
}
