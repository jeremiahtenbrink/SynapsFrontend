import { css } from "styled-components";

/**
 * @typedef {Function} flex css helper for flex items. Just pass int the
 * values you want and it builds out the template literal string for you.
 *
 * @param {Object}
 */
export const flex = ( { flexDirection, justifyContent, alignItems, flexWrap } ) => {
  let rtrString = css`
display: flex;
flex-direction: ${ flexDirection };
`;
  if( justifyContent ){
    rtrString += css`
justify-content: ${ justifyContent };
`;
  }
  
  if( alignItems ){
    rtrString += css`
align-items: ${ alignItems };
`;
  }
  if( flexWrap ){
    rtrString += css`
flex-wrap: ${ flexWrap };
`;
  }
  return rtrString;
};

/**
 * @typedef {Object} FlexBoxProperties
 *
 * @property {string} flexDirection css value for flex-direction
 * @property {string} justifyContent css value for justify-content
 * @property {string} alignItems css value for justify-content
 * @property {string} flexWrap css value for flex-wrap prop.
 *
 * if you don't pass a value for one or any of the properties then it
 * doesn't add the mto the string.
 */

/**
 * @typedef {Function} linearGradients returns a template literal string for
 * a gradient.
 *
 * @param {ObjGradients| GradientsArray} gradients  you want added to the
 *   linear array
 * @param {Number} degrees The angle of the gradient.
 *
 *
 */
export const linearGradient = ( gradients, degrees ) => {

};

/**
 * @typedef {string[]} GradientsArray
 *
 * ["#FFFFF", "#00000", "rgba(233,222,123)"]
 */

/**
 * @typedef {Object} ObjGradients
 * @property Object.<key: string, value: string> key value paris of
 * gradients and their start or stopping percentage.
 *
 * {["2%]: "#fffff, ["50%]: "rgba(255,255,255,.9")}
 */