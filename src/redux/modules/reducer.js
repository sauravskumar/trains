import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';
import { loadingBarReducer } from 'react-redux-loading-bar';
// import auth from './auth';
// import counter from './counter';
// import {reducer as form} from 'redux-form';
// import info from './info';
// import widgets from './widgets';
import search from './search';
import app from './app';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  // auth,
  // form,
  search,
  loadingBar: loadingBarReducer,
  app,
  // multireducer: multireducer({
  //   counter1: counter,
  //   counter2: counter,
  //   counter3: counter
  // }),
  // info,
  // widgets
});
