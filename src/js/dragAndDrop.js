"use strict";

class DragAndDrop {
	constructor( el ) {
		this.rootElement = el;
		this.curDrag = null;
		[].slice.call( el.children )
			.forEach( serie => { serie.draggable = true; } );
		el.ondragstart = this._onDragStart.bind( this );
		document.body.ondragover = this._onDragOver.bind( this );
		document.body.ondrop = this._onDrop.bind( this );
	}
	
	_onDragStart( e ) {
		this.curDrag = e.target;
		
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData( "Text", this.curDrag.textContent );
		this.curDrag.classList.add( "opacity" );
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
	_onDrop( e ) {
		e.preventDefault();
		e.stopPropagation();
		this.curDrag.classList.remove( "opacity" );
		this.rootElement.classList.remove( "no-hover" );
		this._localStorageUpdate();
		return false;
	}
	_localStorageUpdate( order ) {
		localStorage.setItem( "order", 
			Array.from( this.rootElement.children )
				.map( el => el.getAttribute( "name" ) )
				.toString() )
	}
}
