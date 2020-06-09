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
        let value;
        if( variableObj[ variableValue ] ){
          if( typeof variableObj[ variableValue ].yes === "function" ){
            value = variableObj[ variableValue ].yes( props );
          }else if( variableObj[ variableValue ][ "prop" ] ){
            
            value = setValue( variableObj[ variableValue ].yes,
              variableObj[ variableValue ][ "prop" ],
              variableObj[ variableValue ].unit,
            );
            
          }else{
            value = variableObj[ variableValue ].yes;
          }
        }else{
          
          Object.keys( variableObj ).forEach( key => {
            if( variableObj[ key ].no ){
              if( typeof variableObj[ key ].no === "function" ){
                value = variableObj[ key ].no( props );
              }else{
                
                if( variableObj[ key ][ "prop" ] ){
                  value = setValue( variableObj[ key ].no,
                    variableObj[ key ].prop,
                    variableObj[ key ].unit,
                  );
                }else{
                  value = variableObj[ key ].no;
                }
                
              }
            }
          } );
        }
        if( Array.isArray( value ) ){
          returnString += value.join( "" );
        }else{
          returnString += value;
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
  if( typeof value === "string" ){
    let result = units.some( unit => {
      if( value.includes( unit ) ){
        return value;
      }
    } );
    if( result ){
      return value;
    }
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


