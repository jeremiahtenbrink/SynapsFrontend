/**
 * callEveryNode
 *
 * Calls the callback for every el and child el in the element. Including
 * the first el passed in.
 * @property {HTMLElement} el
 * @property {Function} cb
 */
export const callEveryNode = ( el, cb ) => {
  cb( el );
  if( el.hasChildNodes() ){
    el.childNodes.forEach( child => {
      callEveryNode( child, cb );
    } );
  }
};