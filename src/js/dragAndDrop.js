"use strict";

class DragAndDrop {
	constructor( el, handle ) {
		this.rootElement = el;
		this.curDrag = null;
		this.handle = handle;
	}
	
	init() {
		const el = this.rootElement,
			handlers = el.getElementsByClassName( this.handle );

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
	}

	// private
	_onMouseDown( e ) {
		e.target.parentNode.setAttribute( "draggable", "true" );
	}
	_onDragStart( e ) {
		this.curDrag = e.target;
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData( "Text", this.curDrag.parentNode.textContent );
		this.curDrag.classList.add( "serie-opacity" );
		this.rootElement.classList.add( "no-hover" );
	}
	_onDragOver( e ) {
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
	}
	_onDragEnd( e ) {
		e.target.setAttribute( "draggable", "false" );
		this.curDrag.classList.remove( "serie-opacity" );
		this.rootElement.classList.remove( "no-hover" );
	}
	_onDrop( e ) {
		e.preventDefault();
		e.stopPropagation();
		this._localStorageUpdate();
	}
	_localStorageUpdate( order ) {
		localStorage.setItem( "order", 
			Array.from( this.rootElement.children )
				.map( el => el.getAttribute( "name" ) )
				.toString() )
	}
}
