import React from 'react';
import {IndexRoute, Route} from 'react-router';
// import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App,
  // Chat,
  // Widgets,
  // Login,
  // LoginSuccess,
  // Survey,
  NotFound,
  // Home,
  About,

  Train,
  TrainsBetween,
  Station,
  PNRStatus
} from 'containers';

// export default (store) => {
export default () => {
  // const requireLogin = (nextState, replace, cb) => {
  //   function checkAuth() {
  //     const { auth: { user }} = store.getState();
  //     if (!user) {
  //       // oops, not logged in, so can't be here!
  //       replace('/');
  //     }
  //     cb();
  //   }
  //
  //   if (!isAuthLoaded(store.getState())) {
  //     store.dispatch(loadAuth()).then(checkAuth);
  //   } else {
  //     checkAuth();
  //   }
  // };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/">
      <Route path="/trains" component={App}>
        { /* Home (main) route */ }
        <IndexRoute component={TrainsBetween}/>
        <Route path="between/:param" component={TrainsBetween}/>

        { /* Routes requiring login */ }
        {/* <Route onEnter={requireLogin}>
         <Route path="chat" component={Chat}/>
         <Route path="loginSuccess" component={LoginSuccess}/>
         </Route> */}

        { /* Routes */ }
        {/* <Route path="login" component={Login}/>
         <Route path="survey" component={Survey}/>
         <Route path="widgets" component={Widgets}/> */}
        <Route path="station" component={Station}/>
        <Route path="about" component={About}/>
        <Route path="station/:param" component={Station}/>
        <Route path="train-status" component={Train}/>
        <Route path="train-status/:param" component={Train}/>
        {/* <Route path="trains" component={TrainsBetween}/> */}
        <Route path="pnr-status" component={PNRStatus}/>

        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404}/>
      </Route>
    </Route>
  );
};
