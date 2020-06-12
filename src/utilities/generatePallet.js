const polished = require( "polished" );
const fs = require( "fs" );
const { pascalCase } = require( "change-case" );
const { darken, lighten, linearGradient } = polished;

/**
 * @param {Object} colors
 */
const generateColorPallet = ( colors ) => {
  
  const stringArray = generateObjectStartAndClose( "colorPallet",
    ( name, fileStrArr, docStringArray, tabs ) => {
      Object.keys( colors ).forEach( key => {
        
        generateDarker( key,
          colors[ key ],
          fileStrArr,
          docStringArray,
          tabs,
          10,
          .02
        );
        
        addPropertyDocString( key, "Color", docStringArray, tabs - 1 );
        addKeyValueToFileStr( key, colors[ key ], fileStrArr, tabs );
        
        generateLighter( key,
          colors[ key ],
          fileStrArr,
          docStringArray,
          tabs,
          10,
          .02
        );
        
        addStrToArrayStr( "", fileStrArr, tabs );
      } );
      
      generateDarker( "WHITE",
        "#F6F5F3",
        fileStrArr,
        docStringArray,
        tabs,
        10,
        .02
      );
      
      addPropertyDocString( "WHITE", "Color", docStringArray, tabs - 1 );
      addKeyValueToFileStr( "WHITE", "#F6F5F3", fileStrArr, tabs );
      
      addPropertyDocString( "GREEN_TO_BLUE_GRADIENT",
        pascalCase( "GREEN_TO_BLUE_GRADIENT" ),
        docStringArray,
        tabs - 1
      );
      addGradientToFileStr( "GREEN_TO_BLUE_GRADIENT", {
        colorStops: [ "#00EFA9", "#3F56F0" ],
        fallback: "#00EFA9",
        toDirection: "bottom right"
      }, fileStrArr, docStringArray, tabs );
      
    },
    0
  );
  
  fs.writeFileSync( "colorPallet.js", stringArray.join( "\n" ) );
  
};

/**
 * @typedef {Object} GradientConfig
 * @property {string []} colorStops
 * @property {string} toDirection
 * @property {string } fallback
 *
 */

/**
 *
 * @param {string} name
 * @param {GradientConfig} config
 * @param {string []} fileStrArr
 * @param {string []} docStringArray
 * @param {number} tabs
 */
const addGradientToFileStr = ( name, config, fileStrArr, docStringArray,
  tabs = 0 ) => {
  let gradient = linearGradient( config );
  
  const gradientString = generateObjectStartAndClose( name,
    ( gradientName, gradientStringArray, gradientDocStringArr,
      gradientTabs ) => {
      
      const colorString = generateObjectStartAndClose( "colors",
        ( colorsName, colorStringArr, colorDocStringArr, colorTabs ) => {
          
          config.colorStops.forEach( ( color, i ) => {
            const newKey = `color_${ i + 1 }`;
            addPropertyDocString( newKey,
              "Color",
              colorDocStringArr,
              colorTabs - 1
            );
            addKeyValueToFileStr( newKey,
              config.colorStops[ i ],
              colorStringArr,
              colorTabs
            );
          } );
        },
        gradientTabs,
        true,
        name
      );
      addPropertyDocString( pascalCase( "colors" ),
        "object",
        gradientDocStringArr,
        gradientTabs - 1
      );
      gradientStringArray.push( " " );
      colorString.forEach( item => {
        gradientStringArray.push( item );
      } );
      addPropertyDocString( "backgroundColor",
        "string",
        gradientDocStringArr,
        gradientTabs - 1
      );
      addKeyValueToFileStr( "backgroundColor",
        gradient[ "backgroundColor" ],
        gradientStringArray,
        gradientTabs
      );
      addPropertyDocString( "backgroundImage",
        "string",
        gradientDocStringArr,
        gradientTabs - 1
      );
      addKeyValueToFileStr( "backgroundImage",
        gradient[ "backgroundImage" ],
        gradientStringArray,
        gradientTabs
      );
    },
    tabs,
    true,
    name
  );
  fileStrArr.push( " " );
  gradientString.forEach( item => {
    fileStrArr.push( item );
  } );
};

/**
 * @param {string} name
 * @param {genObjectCallBack} cb
 * @param {number} tabs
 * @param {boolean} insideObject
 * @param objectName
 * @return {string[]} docAndFileString
 * @return {string} objectName
 */
const generateObjectStartAndClose = ( name, cb, tabs = 0, insideObject = false,
  objectName = "" ) => {
  const fileStrArr = [];
  const docStringArray = [];
  let str = "";
  if( insideObject ){
    
    str += `${ name }: {`;
  }else{
    str += `export const ${ name } = {`;
  }
  
  generateDocStringStart( name, docStringArray, tabs );
  
  addStrToArrayStr( str, fileStrArr, tabs );
  cb( name, fileStrArr, docStringArray, tabs + 1 );
  str = "}";
  if( insideObject ){
    str += ",";
  }
  
  addStrToArrayStr( str, fileStrArr, tabs );
  closeOutDocStringArr( docStringArray, tabs );
  
  return [ ...docStringArray, ...fileStrArr ];
};
/**
 * @typedef {Function} genObjectCallBack
 * @param {string} name
 * @param {string[]} fileStrArr
 * @param {string[]} docStringArray
 * @param {number} tabs
 */

/**
 *
 */
const closeOutDocStringArr = ( docStringArr, tabs ) => {
  addStrToArrayStr( " */", docStringArr, tabs );
};

/**
 * @param {string} name
 * @param {string[]} docString
 * @param {number} [tabs]
 */
const generateDocStringStart = ( name, docString, tabs = 0 ) => {
  addStrToArrayStr( `/**`, docString, tabs );
  addStrToArrayStr( ` * @typedef {Object} ${ pascalCase( name ) }`,
    docString,
    tabs
  );
};

/**
 * @param {string} key
 * @param {string} color
 * @param {string[]} fileStrArr
 * @param {string[]} docStringArray
 * @param {number = 0} [tabs]
 * @param {number} [numberOfItems]
 * @param {number} [percentage]
 *
 */
const generateDarker = ( key, color, fileStrArr, docStringArray, tabs = 0,
  numberOfItems = 5, percentage = .1, ) => {
  for( let i = numberOfItems; i > 0; i-- ){
    let newKey = `${ key }_DARKER_${ i }`;
    addKeyValueToFileStr( newKey,
      darken( percentage * i, color ),
      fileStrArr,
      tabs
    );
    addPropertyDocString( newKey, "Color", docStringArray );
  }
  
};

/**
 * @param {string} key
 * @param {string} color
 * @param {string[]} fileStrArr
 * @param {string[]} docStringArray
 * @param {number = 0} [tabs]
 * @param {number} [numberOfItems]
 * @param {number} [percentage]
 *
 */
const generateLighter = ( key, color, fileStrArr, docStringArray, tabs = 0,
  numberOfItems = 5, percentage = .1, ) => {
  for( let i = 0; i < numberOfItems; i++ ){
    let newKey = `${ key }_LIGHTER_${ i + 1 }`;
    addKeyValueToFileStr( newKey,
      lighten( percentage * ( i + 1 ), color ),
      fileStrArr,
      tabs
    );
    addPropertyDocString( newKey, "Color", docStringArray );
  }
};

/**
 * @param {string} key
 * @param {string} value
 * @param {string[]} fileStrArr
 * @param {number} tabs
 */
const addKeyValueToFileStr = ( key, value, fileStrArr, tabs = 0 ) => {
  addStrToArrayStr( `${ key }: "${ value }",`, fileStrArr, tabs );
};

/**
 * @param {string} key
 * @param {string} propType
 * @param {string[]} docString
 * @param {number} tabs
 */
const addPropertyDocString = ( key, propType, docString, tabs = 0 ) => {
  const string = ` * @property {${ propType }} ${ key } `;
  addStrToArrayStr( string, docString, tabs );
};

/**
 * @param {string} str
 * @param {string[]} stringArray
 * @param {number} tabs
 */
const addStrToArrayStr = ( str, stringArray, tabs = 0 ) => {
  let strValue = "";
  while( tabs !== 0 ){
    strValue += `\t`;
    tabs--;
  }
  strValue += `${ str }`;
  stringArray.push( strValue );
};

const colors = {
  PRIMARY_COLOR: "#36405C", SECONDARY_COLOR: "#4CB69F"
};

generateColorPallet( colors );
