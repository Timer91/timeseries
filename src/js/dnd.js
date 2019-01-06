"use strict";

UI.dnd = {
	init: function() {
		const el = UI.wrap,
			handlers = el.getElementsByClassName( "drag" );

		this.curDrag = null;
		[].slice.call( el.children ).forEach( show => {
			show.draggable = false;
			show.ondragstart = this._onDragStart.bind( this );
			show.ondragover = this._onDragOver.bind( this );
			show.ondragend = this._onDragEnd.bind( this );
			show.ondrop = this._onDrop.bind( this );
		});
		for ( let h of handlers ) {
			h.onmousedown = this._onMouseDown.bind( this );
			h.onmouseup = this._onMouseUp.bind( this );
		}
	},

	// private
	_onMouseDown: function( e ) {
		e.target.parentNode.setAttribute( "draggable", "true" );
	},
	_onMouseUp: function( e ) {
		e.target.parentNode.setAttribute( "draggable", "false" );
	},
	_onDragStart: function( e ) {
		this.curDrag = e.target;
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData( "Text", this.curDrag.parentNode.textContent );
		this.curDrag.classList.add( "show-opacity" );
		UI.wrap.classList.add( "no-hover" );
	},
	_onDragOver: function( e ) {
		const t = e.target.parentNode;

		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
		if ( t && t !== this.curDrag && t.classList.contains( "show" ) ) {
			const tBCR = t.getBoundingClientRect();

			e.clientY < tBCR.top + tBCR.height / 2
				? t.before( this.curDrag )
				: t.after( this.curDrag );
		}
		return false;
	},
	_onDragEnd: function( e ) {
		this.curDrag.setAttribute( "draggable", "false" );
		this.curDrag.classList.remove( "show-opacity" );
		UI.wrap.classList.remove( "no-hover" );
	},
	_onDrop: function( e ) {
		const order = Array.from( UI.wrap.children )
			.map( el => el.getAttribute( "name" ) );

		e.preventDefault();
		e.stopPropagation();
		STORE.set( "order", order );
	},
}
