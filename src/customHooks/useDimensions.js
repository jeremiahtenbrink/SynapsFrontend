import { useEffect, useContext, useRef } from "react";
import { AppHooksContext } from "./useAppHooks.js";

/**
 * Use Dimensions
 * @category Custom Hooks
 *
 *
 * @description Updates the screen width and screen height on window resize
 * then saves it to the theme.
 *
 */

export const useDimensions = () => {
  
  let timer = useRef( null );
  const { hooks, setHookVariable } = useContext( AppHooksContext );
  const { width, height } = hooks;
  
  useEffect( () => {
    window.addEventListener( "resize", updateDimensions );
    return () => {
      window.removeEventListener( "resize", updateDimensions );
    };
  }, [] );
  
  const updateDimensions = () => {
    
    const update = () => {
      if( width !== window.innerWidth ){
        setHookVariable( "width", window.innerWidth );
      }
      if( height !== window.innerHeight ){
        setHookVariable( "height", window.innerHeight );
      }
      
      timer.current = null;
    };
    
    if( timer.current ){
      clearTimeout( timer.current );
      timer.current = window.setTimeout( update, 400 );
    }else{
      timer.current = window.setTimeout( update, 400 );
    }
    
  };
  
};

