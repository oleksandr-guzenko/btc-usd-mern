import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import guessReducer from "./guessReducer";
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  guess: guessReducer,
  toastr: toastrReducer
});
