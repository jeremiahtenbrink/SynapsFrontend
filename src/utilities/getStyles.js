import { css } from "styled-components";

class StyledComponentStyles{
  constructor( themingValues ){
    this.themingValues = themingValues;
    this.getCssSTyles = this.getCssStyles.bind( this );
  }
  
  /**
   * @typedef {function} GetCssStyles
   * @property {Object} props
   * @returns {TemplateStringsArray}
   */
  getCssStyles( props ){
    let returnString = ``;
    Object.keys( this.themingValues ).forEach( variable => {
      let variableValue;
      if( props[ variable ] ){
        variableValue = props[ variable ];
      }else if( props.theme && props.theme[ variable ] ){
        variableValue = props.theme[ variable ];
      }
      
      if( variableValue ){
        
        const variableObj = this.themingValues[ variable ];
        if( variableObj[ variableValue ] ){
          if( variableObj[ variableValue ][ "prop" ] ){
            const value = setValue( variableObj[ variableValue ].yes,
              variableObj[ variableValue ][ "prop" ],
              variableObj[ variableValue ].unit,
            );
            if( Array.isArray( value ) ){
              returnString = value.join( "" );
            }else{
              returnString += value;
            }
            
          }else{
            returnString += variableObj[ variableValue ].yes;
          }
        }else{
          Object.keys( variableObj ).forEach( key => {
            if( variableObj[ key ].no ){
              if( variableObj[ key ][ props ] ){
                const value = setValue( variableObj[ key ],
                  variableObj[ key ].prop,
                  variableObj[ key ].unit,
                );
                returnString = value.join( "" );
              }else{
                const value = variableObj[ key ].no;
                returnString += value;
              }
              
            }
          } );
        }
      }
      
    } );
    
    return returnString;
  };
}

/**
 * @typedef setUpCssValues;
 * @property {string[]} themingVariables
 * @property {Object.<String, String>} photos themingValues
 * @returns {function}
 */
export const setUpCssValues = ( themingValues ) => {
  
  const styledClass = new StyledComponentStyles( themingValues );
  return styledClass.getCssSTyles;
};

export const setValue = ( value, property, unit ) => {
  return css`${ property }: ${ checkForUnit( value, unit ) }`;
};

const checkForUnit = ( value, baseUnit ) => {
  const units = [ "px", "em", "rem", "%" ];
  
  let result = units.some( unit => {
    if( value.includes( unit ) ){
      return value;
    }
  } );
  if( result ){
    return value;
  }
  return addUnit( value, baseUnit );
};

const addUnit = ( value, unit ) => {
  if( value === 0 ){
    return value;
  }else{
    return value + unit;
  }
  
};


