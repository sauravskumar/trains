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
    let trainsx = []; //eslint-disable-line
    stationInfo.trains.forEach((obj, index) => {
      const trains = obj.properties; // eslint-disable-line no-param-reassign
      trainsx.push(
        <tr key={Date.now() + Math.random()} itemScope
            itemType="http://schema.org/TrainTrip">
          <td itemProp="trainNumber">{trains.train_code}</td>
          <td itemProp="trainName">{trains.train_name}</td>
          <td itemProp="arrivalTime">{stationInfo.route[index].properties.departure_time.toFixed(2).replace('.', ':')}</td>
          <td itemProp="departureTime">{stationInfo.route[index].properties.arrival_time.toFixed(2).replace('.', ':')}</td>
          <td>{trains.all_data[50]}</td>
        </tr>
      );
    });
    let station = {};
    if (stationInfo) {
      station = stationInfo.station.properties;
    }
    if (!params.param) {
      return (
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <AppHelmet title={'Atmed Trains: Station Info.| Trains visiting station'}
                       description={'Get station details, station code, trains visiting station, trains between stations for any railway station you want'}
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
          <AppHelmet
            title={`${station.station_name} (${station.station_code}) | Div: ${station.division} | ${stationInfo.trains.length} Trains | Station Info.`}
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
              </div>
            </div>
          </div>
          <div className="panel panel-default" style={{fontSize: '13px'}}>
            <div className="panel-body">
              <table className="table table-striped table-hover ">
                <thead>
                <tr>
                  <td>Number</td>
                  <td>Name</td>
                  <td>Arrival</td>
                  <td className={style.x}>Dep.</td>
                  <td>Type</td>
                </tr>
                </thead>
                <tbody>
                {trainsx}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
