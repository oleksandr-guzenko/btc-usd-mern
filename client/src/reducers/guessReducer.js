import {
  GET_RECORDS,
  SET_RECORDS,
  ADD_RECORD
} from '../actions/types';

const initialState = {
  records: [],
  recordsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECORDS: 
      return {
          ...state,
          recordsLoading: true
      }

    case SET_RECORDS: 
        return {
            ...state,
            records: action.payload,
            recordsLoading: false
        }
    
    case ADD_RECORD: 
      return {
          ...state,
          records: [...state.records, action.payload],
          recordsLoading: false
      }

    default:
      return state;
  }
}
