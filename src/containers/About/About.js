import React, {Component} from 'react';
import Helmet from 'react-helmet';
// import { MiniInfoBar } from 'components';
import {asyncConnect} from 'redux-connect';
import {loadFooter} from 'redux/modules/search';
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    const promises = [];
    promises.push(dispatch(loadFooter()));
    return Promise.all(promises);
  }
}])
export default class About extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <Helmet title="About Us"/>
          <div className="col-xs-12 col-md-8 col-md-push-2">
            <h1 className=" text-center ">About Trains</h1>
            <p>Atmed trains is a service which tries to solve the problem of a searching for the right train
            for a person by searching trains between not only the specified source and destination but also nearby
            stations. It also provides users with realtime train running status and information such as train
            schedule, station information and pnr number status.</p>
            <br/>
            <h4>Please Note</h4>
            <p>Atmed trains is privately maintained and is not connected with Indian railways, any government
            organisation or Government of India in anyway. The information on this site is intended for
            personal and non-commercial use. We do not guarantee that the information shown on this site
            is totally 100% correct and may vary slightly. Thus the user is advised to verify from multiple
            sources before proceeding.</p>
          </div>
        </div>
      </div>
    );
  }
}
