import { SET_CURRENT_USER, USER_LOADING, GET_USER, SET_GUESS_LOADING } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        }

    case USER_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };

    case SET_GUESS_LOADING:
      let user = state.user;

      user.active = true;

      return {
        ...state,
        user: user
      };

    default:
      return state;
  }
}
