/**
 * @typedef {Object} ColorPallet
 * @property {Color} PRIMARY_COLOR_DARKER_10
 * @property {Color} PRIMARY_COLOR_DARKER_9
 * @property {Color} PRIMARY_COLOR_DARKER_8
 * @property {Color} PRIMARY_COLOR_DARKER_7
 * @property {Color} PRIMARY_COLOR_DARKER_6
 * @property {Color} PRIMARY_COLOR_DARKER_5
 * @property {Color} PRIMARY_COLOR_DARKER_4
 * @property {Color} PRIMARY_COLOR_DARKER_3
 * @property {Color} PRIMARY_COLOR_DARKER_2
 * @property {Color} PRIMARY_COLOR_DARKER_1
 * @property {Color} PRIMARY_COLOR
 * @property {Color} PRIMARY_COLOR_LIGHTER_1
 * @property {Color} PRIMARY_COLOR_LIGHTER_2
 * @property {Color} PRIMARY_COLOR_LIGHTER_3
 * @property {Color} PRIMARY_COLOR_LIGHTER_4
 * @property {Color} PRIMARY_COLOR_LIGHTER_5
 * @property {Color} PRIMARY_COLOR_LIGHTER_6
 * @property {Color} PRIMARY_COLOR_LIGHTER_7
 * @property {Color} PRIMARY_COLOR_LIGHTER_8
 * @property {Color} PRIMARY_COLOR_LIGHTER_9
 * @property {Color} PRIMARY_COLOR_LIGHTER_10
 * @property {Color} SECONDARY_COLOR_DARKER_10
 * @property {Color} SECONDARY_COLOR_DARKER_9
 * @property {Color} SECONDARY_COLOR_DARKER_8
 * @property {Color} SECONDARY_COLOR_DARKER_7
 * @property {Color} SECONDARY_COLOR_DARKER_6
 * @property {Color} SECONDARY_COLOR_DARKER_5
 * @property {Color} SECONDARY_COLOR_DARKER_4
 * @property {Color} SECONDARY_COLOR_DARKER_3
 * @property {Color} SECONDARY_COLOR_DARKER_2
 * @property {Color} SECONDARY_COLOR_DARKER_1
 * @property {Color} SECONDARY_COLOR
 * @property {Color} SECONDARY_COLOR_LIGHTER_1
 * @property {Color} SECONDARY_COLOR_LIGHTER_2
 * @property {Color} SECONDARY_COLOR_LIGHTER_3
 * @property {Color} SECONDARY_COLOR_LIGHTER_4
 * @property {Color} SECONDARY_COLOR_LIGHTER_5
 * @property {Color} SECONDARY_COLOR_LIGHTER_6
 * @property {Color} SECONDARY_COLOR_LIGHTER_7
 * @property {Color} SECONDARY_COLOR_LIGHTER_8
 * @property {Color} SECONDARY_COLOR_LIGHTER_9
 * @property {Color} SECONDARY_COLOR_LIGHTER_10
 * @property {Color} WHITE_DARKER_10
 * @property {Color} WHITE_DARKER_9
 * @property {Color} WHITE_DARKER_8
 * @property {Color} WHITE_DARKER_7
 * @property {Color} WHITE_DARKER_6
 * @property {Color} WHITE_DARKER_5
 * @property {Color} WHITE_DARKER_4
 * @property {Color} WHITE_DARKER_3
 * @property {Color} WHITE_DARKER_2
 * @property {Color} WHITE_DARKER_1
 * @property {Color} WHITE
 * @property {GreenToBlueGradient} GREEN_TO_BLUE_GRADIENT
 */
export const colorPallet = {
  PRIMARY_COLOR_DARKER_10: "#10131c",
  PRIMARY_COLOR_DARKER_9: "#141822",
  PRIMARY_COLOR_DARKER_8: "#181c29",
  PRIMARY_COLOR_DARKER_7: "#1c212f",
  PRIMARY_COLOR_DARKER_6: "#1f2535",
  PRIMARY_COLOR_DARKER_5: "#232a3c",
  PRIMARY_COLOR_DARKER_4: "#272e42",
  PRIMARY_COLOR_DARKER_3: "#2b3349",
  PRIMARY_COLOR_DARKER_2: "#2e374f",
  PRIMARY_COLOR_DARKER_1: "#323c56",
  PRIMARY_COLOR: "#36405C",
  PRIMARY_COLOR_LIGHTER_1: "#3a4462",
  PRIMARY_COLOR_LIGHTER_2: "#3e4969",
  PRIMARY_COLOR_LIGHTER_3: "#414d6f",
  PRIMARY_COLOR_LIGHTER_4: "#455276",
  PRIMARY_COLOR_LIGHTER_5: "#49567c",
  PRIMARY_COLOR_LIGHTER_6: "#4d5b83",
  PRIMARY_COLOR_LIGHTER_7: "#505f89",
  PRIMARY_COLOR_LIGHTER_8: "#54648f",
  PRIMARY_COLOR_LIGHTER_9: "#586896",
  PRIMARY_COLOR_LIGHTER_10: "#5c6d9c",
  
  SECONDARY_COLOR_DARKER_10: "#2d6f61",
  SECONDARY_COLOR_DARKER_9: "#307667",
  SECONDARY_COLOR_DARKER_8: "#337d6d",
  SECONDARY_COLOR_DARKER_7: "#368574",
  SECONDARY_COLOR_DARKER_6: "#398c7a",
  SECONDARY_COLOR_DARKER_5: "#3c9380",
  SECONDARY_COLOR_DARKER_4: "#3f9a86",
  SECONDARY_COLOR_DARKER_3: "#42a28d",
  SECONDARY_COLOR_DARKER_2: "#45a993",
  SECONDARY_COLOR_DARKER_1: "#48b099",
  SECONDARY_COLOR: "#4CB69F",
  SECONDARY_COLOR_LIGHTER_1: "#53b9a3",
  SECONDARY_COLOR_LIGHTER_2: "#5abca7",
  SECONDARY_COLOR_LIGHTER_3: "#62bfab",
  SECONDARY_COLOR_LIGHTER_4: "#69c2af",
  SECONDARY_COLOR_LIGHTER_5: "#70c5b2",
  SECONDARY_COLOR_LIGHTER_6: "#77c8b6",
  SECONDARY_COLOR_LIGHTER_7: "#7fcbba",
  SECONDARY_COLOR_LIGHTER_8: "#86cebe",
  SECONDARY_COLOR_LIGHTER_9: "#8dd1c2",
  SECONDARY_COLOR_LIGHTER_10: "#94d4c6",
  
  WHITE_DARKER_10: "#cac4b9",
  WHITE_DARKER_9: "#cfc9bf",
  WHITE_DARKER_8: "#d3cec4",
  WHITE_DARKER_7: "#d7d3ca",
  WHITE_DARKER_6: "#dcd8d0",
  WHITE_DARKER_5: "#e0ddd6",
  WHITE_DARKER_4: "#e5e2dc",
  WHITE_DARKER_3: "#e9e6e2",
  WHITE_DARKER_2: "#edebe7",
  WHITE_DARKER_1: "#f2f0ed",
  WHITE: "#F6F5F3",
  
  /**
   * @typedef {Object} GreenToBlueGradient
   * @property {object} Colors
   * @property {string} backgroundColor
   * @property {string} backgroundImage
   */
  GREEN_TO_BLUE_GRADIENT: {
    
    /**
     * @typedef {Object} Colors
     * @property {Color} color_1
     * @property {Color} color_2
     */
    colors: {
      color_1: "#00EFA9", color_2: "#3F56F0",
    },
    backgroundColor: "#00EFA9",
    backgroundImage: "linear-gradient(bottom right, #00EFA9, #3F56F0)",
  },
};