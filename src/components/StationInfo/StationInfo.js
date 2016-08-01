/**
 * Created by saurav on 8/7/16.
 */
import React, {Component, PropTypes} from 'react';
import StationInfoForm from './StationInfoForm';
import style from './StationInfo.scss';
import {AppHelmet} from 'components';

export default class StationInfo extends Component {
  static propTypes = {
    params: PropTypes.object,
    stationInfo: PropTypes.object,
    fullUrl: PropTypes.object
  };

  render() {
    const {stationInfo, params, fullUrl} = this.props;
    let station = {};
    if (stationInfo) {
      station = stationInfo.station.properties;
    }
    if (!params.param) {
      return (
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <AppHelmet title={'Atmed Trains: Station Info., Trains visiting station'}
                       description={'Get station details, station code, trains visiting station, trains between stations, station name for any railway station you want'}
                       keywords={'station information, trains visiting station, station details'}
                       url={fullUrl}/>
            <StationInfoForm/>
            <br/>
            <div style={{width: '100%', textAlign: 'center'}}>
              <i className={'material-icons icon-color backgroundIcon'}>&#xE0C8;</i>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-8">
          <AppHelmet title={station.station_code + ' ' + station.station_name + ' Station Info.'}
                     description={'Station Code: ' + station.station_code + ', Station Name: ' + station.station_name + ' station details, Division: ' + station.division + ', Zone: ' + station.zone}
                     keywords={station.station_code + ', ' + station.station_name + ', ' + station.division + ' station details, station information, trains visiting station'}
                     url={fullUrl}/>
          <StationInfoForm/>
          <br/>
          <div className="panel panel-default">
            <div className="panel-heading"
                 style={{background: '#4285F4', padding: '10px 15px 15px 15px', margin: '0px'}}>
              <h1 style={{fontSize: '20px', color: '#FFFFFF'}}>{station.station_code} - {station.station_name}</h1>
            </div>
            <div style={{background: '#3367D6', margin: '0px'}}>
              <div className="row">
                <div className="col-xs-8">
                  <h2 style={{fontSize: '13px', paddingLeft: '15px', color: '#C2D2F3'}}>Division: {station.division} ·
                    Zone: {station.zone}</h2>
                </div>
                {/* <div className="col-xs-6">
                 <div className={style.pimg}
                 style={{backgroundImage: 'url(/trains-images/placeholder/taj.jpg)'}}/>
                 </div> */}
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-body">
              <table className="table table-striped table-hover ">
                <thead>
                <tr>
                  <td>Number</td>
                  <td>Name</td>
                  <td>Days</td>
                  <td>Type</td>
                </tr>
                </thead>
                <tbody>
                {stationInfo.trains.map(trains => {
                  trains = trains.properties; // eslint-disable-line no-param-reassign
                  return (
                    <tr key={Date.now() + Math.random()}>
                      <td>{trains.train_code}</td>
                      <td>{trains.train_name}</td>
                      <td className={style.days}>
                        {trains.days.map(day => {
                          return (
                            <span key={Date.now() + Math.random()}>{day ? day : ''}</span>
                          );
                        })}</td>
                      <td>{trains.all_data[50]}</td>
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
