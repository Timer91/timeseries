"use strict";

TS.dnd = {
	init: function() {
		const el = TS.container,
			handlers = el.getElementsByClassName( "drag" );

		this.curDrag = null;
		[].slice.call( el.children ).forEach( serie => {
			serie.draggable = false;
			serie.ondragstart = this._onDragStart.bind( this );
			serie.ondragover = this._onDragOver.bind( this );
			serie.ondragend = this._onDragEnd.bind( this );
			serie.ondrop = this._onDrop.bind( this );
		});
		for ( let h of handlers ) {
			h.onmousedown = this._onMouseDown.bind( this );
		}
	},

	// private
	_onMouseDown: function( e ) {
		e.target.parentNode.setAttribute( "draggable", "true" );
	},
	_onDragStart: function( e ) {
		this.curDrag = e.target;
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData( "Text", this.curDrag.parentNode.textContent );
		this.curDrag.classList.add( "serie-opacity" );
		TS.container.classList.add( "no-hover" );
	},
	_onDragOver: function( e ) {
		const t = e.target.parentNode;

		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
		if ( t && t !== this.curDrag && t.classList.contains( "serie" ) ) {
			const tBCR = t.getBoundingClientRect();

			e.clientY < tBCR.top + tBCR.height / 2
				? t.before( this.curDrag )
				: t.after( this.curDrag );
		}
		return false;
	},
	_onDragEnd: function( e ) {
		e.target.setAttribute( "draggable", "false" );
		this.curDrag.classList.remove( "serie-opacity" );
		TS.container.classList.remove( "no-hover" );
	},
	_onDrop: function( e ) {
		e.preventDefault();
		e.stopPropagation();
		this._localStorageUpdate();
	},
	_localStorageUpdate( order ) {
		localStorage.setItem( "order", 
			Array.from( TS.container.children )
				.map( el => el.getAttribute( "name" ) )
				.toString() )
	}
}
