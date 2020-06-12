import { css } from "styled-components";

export const flex = ( { flexDirection, justifyContent, alignItmes, flexWrap } ) => {
  let rtrString = css`
display: flex;
flex-direction: ${ flexDirection };
`;
  if( justifyContent ){
    rtrString += css`
justify-content: ${ justifyContent };
`;
  }
  
  if( alignItmes ){
    rtrString += css`
align-items: ${ alignItmes };
`;
  }
  if( flexWrap ){
    rtrString += css`
flex-wrap: ${ flexWrap };
`;
  }
  return rtrString;
};