import {
  SIGNED_IN, SIGNIN_FAILED, SIGNOUT, ATTEMPT_SIGNIN, USER_REGISTER_FAILED,
  USER_ATTEMPT_REGISTER, USER_REGISTER_COMPLETE, CHECK_USER_REGISTERED,
} from "../actions";

/**
 * @typedef {object} UsersReducerState
 * @property {boolean} fetching - Fetching the user from the database.
 * @property {Error | null} error - Fetching the user from the database.
 * @property {User | {}} user - Fetching the user from the database.
 * @property {boolean} checkingRegistered - Fetching the user from the database.
 * @property {boolean} userRegistered - Fetching the user from the database.
 * @property {Error | null} registerError - Fetching the user from the database.
 */

/**
 * @type {UsersReducerState}
 */
const initialState = {
  user: {},
  fetching: false,
  checkingRegistered: false,
  registering: false,
  userRegistered: false,
  registerError: null,
  error: null,
};

/**
 * Users Reducer
 * @category Reducers
 * @function
 * @name usersReducer
 * @param {UsersReducerState} state
 * @param {Action} action
 * @returns {UsersReducerState} state
 */
export const usersReducer = ( state = initialState, action ) => {
  switch( action.type ){
    case "SET_INIT_STATE":
      if( action.payload && action.payload.name &&
        action.payload.name.includes( "users" ) && action.payload.value ){
        return action.payload.value;
      }
      return state;
    case ATTEMPT_SIGNIN:
      return { ...state, fetching: true, error: null, registerError: null };
    case SIGNED_IN:
      return {
        ...state,
        user: action.payload,
        fetching: false,
        error: null,
        registerError: null,
      };
    case SIGNIN_FAILED:
      return { ...state, user: {}, fetching: false, error: action.payload };
    case SIGNOUT:
      return { ...state, user: {}, error: null, registerError: null };
    case CHECK_USER_REGISTERED:
      return { ...state, checkingRegistered: true, registerError: null };
    case USER_ATTEMPT_REGISTER:
      return {
        ...state,
        checkingRegistered: false,
        registering: true,
        registerError: null,
      };
    case USER_REGISTER_COMPLETE:
      return {
        ...state,
        registering: false,
        userRegistered: true,
        registerError: null,
      };
    case USER_REGISTER_FAILED:
      return {
        ...state,
        user: {},
        registering: false,
        userRegistered: false,
        registerError: action.payload,
      };
    
    default:
      return state;
  }
};
