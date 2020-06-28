import { combineReducers } from 'redux';
import { reducer as formReducers } from 'redux-form';
import authReducers from './authReducers';
import streamReducers from './streamReducers';

export default combineReducers({
    auth: authReducers,
    form: formReducers,
    streams: streamReducers
});