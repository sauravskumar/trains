/**
 * Created by saurav on 8/7/16.
 */
import React, {Component, PropTypes} from 'react';
// import { Link } from 'react-router';
import {AppHelmet, PNRStatusForm} from 'components';
// import config from '../../config';
// import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadPnr} from 'redux/modules/search';
// import style from './PNRStatus.scss';
import {asyncConnect} from 'redux-connect';
import {loadFooter} from 'redux/modules/search';
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    const promises = [];
    promises.push(dispatch(loadFooter()));
    return Promise.all(promises);
  }
}])
@connect(
  state => ({pnr: state.search.pnr}),
  dispatch => bindActionCreators({loadPnr}, dispatch)
)
export default class PNRStatus extends Component {
  static propTypes = {
    pnr: PropTypes.object,
    loadPnr: PropTypes.func,
    params: PropTypes.object,
    location: PropTypes.object
  };

  render() {
    const {pnr, location} = this.props;
    const fullUrl = location.pathname;
    if (!pnr) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8">
              <AppHelmet title={'Atmed Trains: PNR Status | PNR Number Status'}
                         description={'Check train PNR Status. Get seat availability, PNR Number status, train schedule and register for train alerts.'}
                         keywords={'pnr status, pnr status check, pnr number check, pnr number status, berth availability'}
                         url={fullUrl}/>
              <PNRStatusForm/>
              <br/>
              <div className="text-center">
                <i className={'material-icons icon-color backgroundIcon'}>&#xE42B;</i>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <PNRStatusForm/>
            <br/>
            <div className="panel panel-default">
              <div className="panel-heading text-center" style={{padding: '0px', margin: '0px'}}>
                {!pnr.error ? <div style={{background: '#4285F4', padding: '1px'}}>
                  <h1 style={{fontSize: '20px', color: '#FFFFFF'}}>PNR Status</h1>
                </div> : <div style={{background: '#E53935', padding: '1px'}}>
                  <h1 style={{fontSize: '20px', color: '#FFFFFF'}}>PNR Status could not be found</h1>
                </div>}
              </div>
              <div className="panel-body" style={{margin: '5px 15px 15px 15px'}}>
                <div>
                  Boarding: {pnr.boarding_point.code} - {pnr.boarding_point.name}
                </div>
                <div>
                  Destination: {pnr.reservation_upto.code} - {pnr.reservation_upto.name}
                </div>
                <div>
                  Train: {pnr.train_num} - {pnr.train_name}
                </div>
                <div>
                  Date: {pnr.doj}
                </div>
              </div>
            </div>
            <div className="panel panel-default" style={{padding: '15px'}}>
              <div className="panel-body">
                <h5>Passengers List</h5>
                <table className="table table-striped table-hover">
                  <thead>
                  <tr>
                    <td>No.</td>
                    <td>Current Status</td>
                    <td>Booking Status</td>
                    <td>Coach Position</td>
                  </tr>
                  </thead>
                  <tbody>
                  {pnr.passengers.map(passenger => {
                    return (
                      <tr key={Date.now() + Math.random()}>
                        <td>{passenger.no}</td>
                        <td>{passenger.current_status}</td>
                        <td>{passenger.booking_status}</td>
                        <td>{passenger.coach_position}</td>
                      </tr>
                    );
                  })}
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
