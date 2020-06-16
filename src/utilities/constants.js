/**
 * @typedef {number} LogType
 *
 */

import { css } from "styled-components";
import { colorPallet } from "./colorPallet";

/**
 * @typedef {("APP_VIEW_DESKTOP" | "APP_VIEW_MOBILE")} AppView
 *
 */

/**
 * @typedef {Object} theme
 * @property {ColorPallet} colors
 * @property {string} FONT_FAMILY
 * @property {string} DEFAULT_FONT_SIZE
 * @property {string} FONT_LIGHT
 * @property {string} FONT_DARK
 * @property {number} FONT_WEIGHT
 * @property {number} LINE_HEIGHT
 *
 */
let THEMEprep = {
  colors: colorPallet,
  
  CONTAINER_BG: "white",
  
  PRIMARY_COLOR: "#0D2545",
  PRIMARY_COLOR_LIGHTER1: "#36405C",
  
  COLOR_WHITE: "#F0EDE6",
  
  SECONDARY_COLOR: "#A2D8C7",
  SECONDARY_DARKER1: "#4CB69F",
  
  NAV_BAR_HEIGHT: 75,
  FOOTER_HEIGHT: 30,
  
  NAV_BAR_DARK: "#0C2545",
  NAV_BAR_LIGHT: "#F6F5F3",
  
  SYNAPS_DARK: "#36405C",
  SYNAPS_LIGHT: "#FFFFFF",
  
  BRAIN_PIC_DARK: "#164167",
  BRAIN_PIC_LIGHT: "#E1DED7",
  
  MAX_DASHBOARD_CONTAINER_WIDTH: 1140,
  
  FONT_FAMILY: `"Source Sans Pro",serif;`,
  DEFAULT_FONT_SIZE: "24px",
  FONT_LIGHT: "#F6F5F3",
  FONT_DARK: "#323C56",
  FONT_WEIGHT: 700,
  LINE_HEIGHT: 1.1,
};

THEMEprep = {
  ...THEMEprep, flexCenterColumn: css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`,
};

export const THEME = { ...THEMEprep };

/**
 * @typedef {Object} ThemeState
 *
 *
 */

export const APP_VIEW_MOBILE = "mobile";
export const APP_VIEW_DESKTOP = "desktop";

/**
 * @typedef {string} APP_PATH
 */

/**
 * @typedef {object.<{APP_PATH}, string>} AppPaths
 */
export const APP_PATHS = {
  SIGN_UP_PATH: "/signup",
  SIGN_IN_PATH: "/signin",
  DASHBOARD_PATH: "/dashboard",
  CREATE_DECK_PATH: "/create/deck",
  PREVIEW_DECK_PATH: "/preview",
  TESTING: "/test",
  LANDING_PAGE: "/",
  QUIZ_MODE: "/quiz-mode",
};

/**
 * @type Sizes
 *
 */
export const SIZES = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};
/**
 * @category Utilities
 * @type {Devices}
 */
export const MEDIA_QUERIES = {
  mobileS: `(min-width: ${ SIZES.mobileS }px)`,
  mobileM: `(min-width: ${ SIZES.mobileM }px)`,
  mobileL: `(min-width: ${ SIZES.mobileL }px)`,
  tablet: `(min-width: ${ SIZES.tablet }px)`,
  laptop: `(min-width: ${ SIZES.laptop }px)`,
  laptopL: `(min-width: ${ SIZES.laptopL }px)`,
  desktop: `(min-width: ${ SIZES.desktop }px)`,
};

/**
 * @typedef {function} Dispatch
 */

/**
 * @typedef {string} Color
 */

/**
 * @typedef {object} Sizes
 * @property {number} mobileS '320px',
 * @property {number} mobileM '375px',
 * @property {number} mobileL '425px',
 * @property {number} tablet '768px',
 * @property {number} laptop '1024px',
 * @property {number} laptopL '1440px',
 * @property {number} desktop '2560px',
 */

/**
 * @typedef {string} MediaQuery
 */

/**
 * @typedef {object} Devices
 * @property {MediaQuery} mobileS   320px
 * @property {MediaQuery} mobileM   375px
 * @property {MediaQuery} mobileL   425px
 * @property {MediaQuery} tablet    768px
 * @property {MediaQuery} laptop    1024px
 * @property {MediaQuery} laptopL   1440px
 * @property {MediaQuery} desktop   2560px
 */
