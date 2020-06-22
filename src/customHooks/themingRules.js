import { createRule } from "./useStyledThemingRules.js";
import {
  APP_PATHS, APP_VIEW_DESKTOP, APP_VIEW_MOBILE,
} from "../utilities/constants.js";

/**
 * @typedef {Object} THEMING_VARIABLES
 * @property {string} BACKGROUND
 * @property {string} BRAIN_SVG
 * @property {string} FOOTER
 * @property {string} CONTAINER
 * * @property {string} APP_VIEW
 * @property {string} WIDTH
 * @property {string} HEIGHT
 */
export const THEMING_VARIABLES = {
  BACKGROUND: "background",
  BRAIN_SVG: "brainSvg",
  FOOTER: "footer",
  CONTAINER: "container",
  APP_VIEW: "appView",
  WIDTH: "width",
  HEIGHT: "height",
  PATH: "path",
};

/**
 * @typedef {string }THEME_VARIABLE
 */

/**
 * @typedef {object.<THEMING_VALUE, {string}>} THEMING_VALUES
 */
export const THEMING_VALUES = {
  HIDDEN: "hidden",
  VISIBLE: "visible",
  DARK: "dark",
  LIGHT: "light",
  BOTTOM: "bottom",
  TOP: "top",
  MOBILE: "mobile",
  DESKTOP: "desktop",
};

/**
 * @typedef {Object} ThemeRuleValues
 * @property {string} DARK
 * @property {string} HIDDEN
 * @property {string} VISIBLE
 * @property {string} LIGHT
 * @property {string} BOTTOM
 * @property {string} TOP
 * @property {string} MOBILE
 * @property {string} DESKTOP
 * @property {number} WIDTH
 * @property {number} HEIGHT
 */
export const DEFAULT_THEME_RULE_VALUES = {
  [ THEMING_VARIABLES.BACKGROUND ]: THEMING_VALUES.DARK,
  [ THEMING_VARIABLES.BRAIN_SVG ]: THEMING_VALUES.TOP,
  [ THEMING_VARIABLES.FOOTER ]: THEMING_VALUES.HIDDEN,
  [ THEMING_VARIABLES.CONTAINER ]: THEMING_VALUES.TOP,
  [ THEMING_VARIABLES.WIDTH ]: window.innerWidth,
  [ THEMING_VARIABLES.HEIGHT ]: window.innerHeight,
  [ THEMING_VARIABLES.PATH ]: APP_PATHS.LANDING_PAGE,
  [ "ROUTING" ]: "ROUTING",
};

/**
 * @typedef {string} THEMING_VALUE
 */

/**
 * @typedef {ThemeRule[]} themingRules
 */
export const getThemingRules = () => [
  createRule( THEMING_VARIABLES.BACKGROUND, THEMING_VALUES.DARK, [
    APP_PATHS.SIGN_IN_PATH, APP_PATHS.QUIZ_MODE, APP_PATHS.PREVIEW_DECK_PATH,
  ], APP_VIEW_DESKTOP ),
  createRule( THEMING_VARIABLES.BACKGROUND, THEMING_VALUES.LIGHT, [
    APP_PATHS.SIGN_UP_PATH, APP_PATHS.CREATE_DECK_PATH, APP_PATHS.LANDING_PAGE,
    APP_PATHS.DASHBOARD_PATH,
  ], APP_VIEW_DESKTOP ),
  createRule( THEMING_VARIABLES.BACKGROUND, THEMING_VALUES.DARK, [
    APP_PATHS.SIGN_IN_PATH, APP_PATHS.LANDING_PAGE, APP_PATHS.QUIZ_MODE,
    APP_PATHS.CREATE_DECK_PATH, APP_PATHS.DASHBOARD_PATH,
  ], APP_VIEW_MOBILE ),
  createRule( THEMING_VARIABLES.BACKGROUND, THEMING_VALUES.LIGHT, [
    APP_PATHS.SIGN_UP_PATH,
  ], APP_VIEW_MOBILE ),
  createRule( THEMING_VARIABLES.BRAIN_SVG, THEMING_VALUES.TOP, [
    APP_PATHS.DASHBOARD_PATH, APP_PATHS.CREATE_DECK_PATH,
    APP_PATHS.LANDING_PAGE, APP_PATHS.QUIZ_MODE, APP_PATHS.PREVIEW_DECK_PATH,
  ], APP_VIEW_DESKTOP ), createRule( THEMING_VARIABLES.BRAIN_SVG,
    THEMING_VALUES.BOTTOM,
    [ APP_PATHS.SIGN_UP_PATH, APP_PATHS.SIGN_IN_PATH ],
    APP_VIEW_DESKTOP,
  ), createRule( THEMING_VARIABLES.BRAIN_SVG,
    THEMING_VALUES.HIDDEN,
    [ APP_PATHS.TESTING ],
    APP_VIEW_DESKTOP,
  ), createRule( THEMING_VARIABLES.BRAIN_SVG,
    THEMING_VALUES.MOBILE,
    [ APP_PATHS.SIGN_UP_PATH, APP_PATHS.SIGN_IN_PATH ],
    APP_VIEW_MOBILE,
  ), createRule( THEMING_VARIABLES.BRAIN_SVG, THEMING_VALUES.HIDDEN, [
    APP_PATHS.DASHBOARD_PATH, APP_PATHS.CREATE_DECK_PATH,
    APP_PATHS.LANDING_PAGE, APP_PATHS.QUIZ_MODE, APP_PATHS.TESTING,
    APP_PATHS.PREVIEW_DECK_PATH,
  ], APP_VIEW_MOBILE ),
  createRule( THEMING_VARIABLES.FOOTER, THEMING_VALUES.HIDDEN, [
    APP_PATHS.SIGN_UP_PATH, APP_PATHS.SIGN_IN_PATH, APP_PATHS.LANDING_PAGE,
    APP_PATHS.CREATE_DECK_PATH,
  ], APP_VIEW_MOBILE ),
  createRule( THEMING_VARIABLES.FOOTER, THEMING_VALUES.VISIBLE, [
    APP_PATHS.DASHBOARD_PATH, APP_PATHS.PREVIEW_DECK_PATH, APP_PATHS.QUIZ_MODE,
  ], APP_VIEW_MOBILE ),
  createRule( THEMING_VARIABLES.FOOTER, THEMING_VALUES.HIDDEN, [
    APP_PATHS.DASHBOARD_PATH, APP_PATHS.PREVIEW_DECK_PATH, APP_PATHS.QUIZ_MODE,
    APP_PATHS.CREATE_DECK_PATH, APP_PATHS.LANDING_PAGE, APP_PATHS.SIGN_IN_PATH,
    APP_PATHS.SIGN_UP_PATH, APP_PATHS.TESTING,
  ], APP_VIEW_DESKTOP ),
];
