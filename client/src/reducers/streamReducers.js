import {
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  DELETE_STREAM
} from "../actions/types";
import _ from "lodash";

const streamReducers = (state = {}, action) => {
  switch (action.type) {
    case EDIT_STREAM:
      // Key interpolation [action.payload.id] is not an array, instead a key
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAMS:
      // Very important Line --> have used mapKeys to convert a list of objects to an object
      // with a value of a key from each object in an array
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default streamReducers;
