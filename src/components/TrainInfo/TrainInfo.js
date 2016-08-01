/**
 * Created by saurav on 8/7/16.
 */
import React, {Component, PropTypes} from 'react';
import TrainInfoForm from './TrainInfoForm';
import style from './TrainInfo.scss';
import {AppHelmet} from 'components';

export default class TrainInfo extends Component {
  static propTypes = {
    params: PropTypes.object,
    train: PropTypes.object,
    fullUrl: PropTypes.string
  };

  render() {
    const {train, params, fullUrl} = this.props;
    if (!params.param) {
      return (
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <AppHelmet title={'Atmed Trains: Train Running Status | Train Route | Train Info.'}
                       description={'Check Train running status, Berth availability, Train Route and seat fare of any train.'}
                       keywords={'Train status, live status, train info, train details, seat fare, seat availability'}
                       url={fullUrl}/>
            <TrainInfoForm/>
            <br/>
            <div style={{width: '100%', textAlign: 'center'}}>
              <i className={'material-icons icon-color backgroundIcon'}>&#xE534;</i>
            </div>
          </div>
        </div>
      );
    }
    if (!train || !train.code) {
      return (
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <AppHelmet title={'Atmed Trains: Train Running Status | Train Route | Train Info.'}
                       description={'Check Train running status, Berth availability, Train Route and seat fare of any train.'}
                       keywords={'Train status, live status, train info, train details, seat fare, seat availability'}
                       url={fullUrl}/>
            <TrainInfoForm/>
            <br/>
            <div style={{width: '100%', textAlign: 'center'}}>
              <div className="panel-heading text-center" style={{padding: '0px', margin: '0px'}}>
                <div style={{background: '#E53935', padding: '1px'}}>
                  <h1 style={{fontSize: '24px', color: '#FFFFFF'}}>No Train Found</h1>
                </div>
              </div>
              <div style={{background: '#EF5350', padding: '1px'}}>
                <h2 style={{fontSize: '18px', color: '#FFEBEE'}}>{params.param}</h2>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-8">
          <AppHelmet title={`${train.name} - (${train.code}) | ${train.all_data[2]} to ${train.all_data[4]}`}
                     description={'Name: ' + train.code + '-' + train.name + '. Dep: ' + train.all_data[10].replace('.', ':') + '. Arr: ' + train.all_data[11].replace('.', ':') + ' Get ' + train.code + '-' + train.name + ' running status, seat availability, route, train schedule, seat fare.'}
                     keywords={'Train running status, train info, seat fare, berth availability'}
                     url={fullUrl}/>
          <TrainInfoForm/>
          <br/>
          <div className="panel panel-default" itemScope itemType="http://schema.org/TrainTrip">
            <div className="panel-heading"
                 style={{background: '#4285F4', padding: '10px 15px 15px 15px'}}>
              <h1 style={{fontSize: '20px', color: '#FFFFFF'}}><span itemProp="trainNumber">{train.code}</span> - <span
                itemProp="trainName">{train.name}</span></h1>
            </div>
            <div style={{background: '#3367D6', margin: '0px'}}>
              <div className="row">
                <div className="col-xs-12">
                  <h2 style={{fontSize: '15px', paddingLeft: '15px', color: '#C2D2F3'}}>
                    <span itemProp="departureStation"><b>{train.all_data[3]}</b> - {train.all_data[2]}</span> To&nbsp;
                    <span itemProp="arrivalStation"><b>{train.all_data[5]}</b> - {train.all_data[4]}</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="panel-body" style={{margin: '15px'}}>
              Start: <span itemProp="arrivalTime">{train.all_data[10].replace('.', ':')}</span><br/>
              End: <span itemProp="departureTime">{train.all_data[11].replace('.', ':')}</span><br/>
              <span>Duration: {train.all_data[12].replace('.', ':')}</span><br/>
              {train.type}<br/>
              <div className={style.days}>
                {train.days.map(day => {
                  return (
                    <span key={Date.now() + Math.random()}>{day}</span>
                  );
                })}
              </div>
              <div>Classes:&nbsp;
                {train.classes.map(classes => {
                  return (
                    <span key={Date.now() + Math.random()}>{classes}&nbsp;</span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="panel panel-default" style={{fontSize: '13px'}}>
            <div className="panel-body" style={{padding: '0px', margin: '0px', overflow: 'hidden'}}>
              <table className="table table-striped table-hover">
                <thead>
                <tr>
                  <td>Pos.</td>
                  <td>Station</td>
                  <td>Arr.</td>
                  <td>Dep.</td>
                  <td>Day</td>
                  <td>Dist.</td>
                </tr>
                </thead>
                <tbody>
                {train.route.map(route => {
                  return (
                    <tr key={Date.now() + Math.random()}>
                      <td>{route.position}</td>
                      <td>{route.station_name} - {route.station_code}</td>
                      <td>{route.arrival_time.toFixed(2)}</td>
                      <td>{route.departure_time.toFixed(2)}</td>
                      <td>{route.day}</td>
                      <td>{route.distance} km</td>
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
