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
  Cancelled,
  // Home,
  // About,
  Train,
  TrainsBetween,
  Station,
  PNRStatus,
  About,
  Contact,
  PrivacyPolicy
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
    <Route path="/in/trains" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={TrainsBetween}/>
      <Route path="between/:param" component={TrainsBetween}/>
      <Route path="station" component={Station}/>
      <Route path="cancelled" component={Cancelled}/>
      <Route path="cancelled/:param" component={Cancelled}/>
      <Route path="station/:param" component={Station}/>
      <Route path="running-status-route" component={Train}/>
      <Route path="running-status-route/:param" component={Train}/>
      {/* <Route path="trains" component={TrainsBetween}/> */}
      <Route path="pnr-status" component={PNRStatus}/>
      <Route path="about" component={About}/>
      <Route path="contact-us" component={Contact}/>
      <Route path="privacy-policy" component={PrivacyPolicy}/>
      <Route path=":param" component={TrainsBetween}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
