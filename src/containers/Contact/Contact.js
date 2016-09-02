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
      <div>
        <div className="container">
          <div className="row">
            <Helmet title="Contact Us"/>
            <div className="col-xs-12 col-md-6 col-md-push-3">
              <h1 className=" text-center ">Contact Us</h1>
              <br/>
              <div className="panel panel-default">
                <table className="table table-striped table-hover ">
                  <tbody>
                  <tr>
                    <td>Email</td>
                    <td>admin@atmed.co</td>
                  </tr>
                  <tr>
                    <td>Contact Person</td>
                    <td>Saurav Kumar</td>
                  </tr>
                  <tr>
                    <td>Mobile Number</td>
                    <td>(+91) 9798823594</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>203, Aakash Tower, Dimna Road, Mango, Jamshedpur, Jharkhand (831012) India</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
