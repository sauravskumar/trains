/**
 * Created by saurav on 8/7/16.
 */
import React, {Component, PropTypes} from 'react';
// import { Link } from 'react-router';
import {AppHelmet} from 'components';
// import config from '../../config';
// import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadPnr} from 'redux/modules/search';
import style from './PNRStatus.scss';

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
  loadPnr = () => {
    // console.log(this.refs.pnrInput.value, event);
    this.props.loadPnr(this.refs.pnrInput.value);
  };

  render() {
    const {pnr, location} = this.props;
    const fullUrl = location.pathname;
    if (!pnr) {
      return (
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <AppHelmet title={'Atmed Trains: PNR Status | PNR Number Status'}
                       description={'Check train PNR Status. Get seat availability, PNR Number status, train schedule and register for train alerts.'}
                       keywords={'pnr status, pnr status check, pnr number check, pnr number status, berth availability'}
                       url={fullUrl}/>
            <div className={'form-inline text-center ' + style.PNRStatusForm}>
              <input className="form-control" ref="pnrInput" id="focusedInput" type="text" style={{margin: '0 auto', marginBottom: '10px'}}
                     placeholder="Enter PNR Number"/>
              <button className="btn btn-primary" onClick={this.loadPnr}>Search</button>
            </div>
            <br/>
            <div className="text-center">
              <i className={'material-icons icon-color backgroundIcon'}>&#xE42B;</i>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-8">
          <div className={'form-inline text-center ' + style.PNRStatusForm}>
            <input className="form-control" ref="pnrInput" id="focusedInput" type="text" style={{margin: '0 auto'}}
                   placeholder="Enter PNR Number"/>
            <button className="btn btn-primary" onClick={this.loadPnr}>Search</button>
          </div>
          <br/>
          <div className="panel panel-default">
            <div className="panel-heading text-center" style={{padding: '0px', margin: '0px'}}>
              <div style={{background: '#4285F4', padding: '1px'}}>
                <h1 style={{fontSize: '20px', color: '#FFFFFF'}}>PNR Status</h1>
              </div>
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
    );
  }
}
