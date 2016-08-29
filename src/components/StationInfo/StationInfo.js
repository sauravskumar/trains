/**
 * Created by saurav on 8/7/16.
 */
import React, {Component, PropTypes} from 'react';
import StationInfoForm from './StationInfoForm';
import style from './StationInfo.scss';
import {AppHelmet} from 'components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onPageSetStatus} from 'redux/modules/app';

@connect(
  null,
  dispatch => (bindActionCreators({onPageSetStatus}, dispatch))
)
export default class StationInfo extends Component {
  static propTypes = {
    params: PropTypes.object,
    stationInfo: PropTypes.object,
    fullUrl: PropTypes.object,
    onPageSetStatus: PropTypes.func
  };

  componentWillMount = () => {
    // Update status by executing redux-action
    if (!this.props.params.param) {
      this.props.onPageSetStatus(200);
    }else if (!this.props.stationInfo || !this.props.stationInfo.station) {
      this.props.onPageSetStatus(404);
    }
  };

  render() {
    const {stationInfo, params, fullUrl} = this.props;
    let placeholder = '';
    if (params.param) {
      placeholder = params.param.replace(/-/g, ' ').toUpperCase();
    }
    const stationInfoForm = () =>{
      return (<StationInfoForm placeholder={placeholder}/>);
    };
    let trainsList = []; //eslint-disable-line
    let station = {};
    if (!params.param) {
      return (
        <div className="row text-capitalize">
          <div className="col-xs-12 col-sm-8">
            <AppHelmet title={'Atmed Trains: Station Info.| Trains visiting station'}
                       description={'Get station details, station code, trains visiting station, trains between stations for any railway station you want'}
                       keywords={'station information, trains visiting station, station details'}
                       url={fullUrl}/>
            {stationInfoForm()}
            <br/>
            <div style={{width: '100%', textAlign: 'center'}}>
              <i className={'material-icons icon-color backgroundIcon'}>&#xE0C8;</i>
            </div>
          </div>
        </div>
      );
    }
    if (!stationInfo || !stationInfo.station) {
      return (
        <div className="row text-capitalize">
          <div className="col-xs-12 col-sm-8">
            <AppHelmet title={'Atmed Trains: Station Info.| Trains visiting station'}
                       description={'Get station details, station code, trains visiting station, trains between stations for any railway station you want'}
                       keywords={'station information, trains visiting station, station details'}
                       url={fullUrl}/>
            {stationInfoForm()}
            <br/>
            <div className="panel panel-default" style={{width: '100%', textAlign: 'center'}}>
              <div className="panel-heading text-center" style={{padding: '0px', margin: '0px'}}>
                <div style={{background: '#E53935', padding: '1px'}}>
                  <h1 style={{fontSize: '24px', color: '#FFFFFF'}}>No Station Found</h1>
                </div>
              </div>
              <div style={{background: '#EF5350', padding: '1px'}}>
                <h2 className="text-capitalize" style={{fontSize: '18px', color: '#FFEBEE'}}>{params.param}</h2>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (stationInfo) {
      station = stationInfo.station.properties;
    }

    stationInfo.trains.forEach((obj, index) => {
      const trains = obj.properties; // eslint-disable-line no-param-reassign
      trainsList.push(
        <tr key={Date.now() + Math.random()} itemScope
            itemType="http://schema.org/TrainTrip">
          <td itemProp="trainName" style={{maxWidth: '100px'}}>{trains.train_code} - {trains.train_name}</td>
          <td>
            <div className="row">
              <div className={'col-xs-12 ' + style.days}>
                {trains.days.map(day => {
                  return (
                    <span key={Date.now() + Math.random()}>{day ? day : ''}</span>
                  );
                })}
              </div>
            </div>
          </td>
          <td
            itemProp="arrivalTime">{stationInfo.route[index].properties.arrival_time.toFixed(2).replace('.', ':')}</td>
          <td
            itemProp="departureTime">{stationInfo.route[index].properties.departure_time.toFixed(2).replace('.', ':')}</td>
          <td style={{maxWidth: '70px'}}>{trains.all_data[50]}</td>
        </tr>
      );
    });
    const getRandom = (arr, number) => {
      let result = new Array(number), // eslint-disable-line
        len = arr.length,
        taken = new Array(len); // eslint-disable-line
      if (number > len) {
        throw new RangeError('getRandom: more elements taken than available');
      }
      while (number--) { // eslint-disable-line
        const number2 = Math.floor(Math.random() * len);
        result[number] = arr[number2 in taken ? taken[number2] : number2];
        taken[number2] = --len;
      }
      return result;
    };
    const keywords = ['trains between stations', 'railway enquiry', 'trains at station',
      'station details', 'station information', 'trains visiting station', 'train arrivals at station'];
    const descEnd = getRandom(keywords, 4).join(', ').toLowerCase();
    const description = 'Station Code: ' + station.station_code +
      '. Station Name: ' + station.station_name + '. Division: ' + station.division +
      '. Zone: ' + station.zone + '. Get ' + descEnd + '.';
    return (
      <div className="row text-capitalize">
        <div className="col-xs-12 col-sm-8">
          <AppHelmet
            title={`${station.station_name} (Station Code: ${station.station_code}) - ${stationInfo.trains.length} Trains - Station Info. | Atmed Trains`}
            description={description}
            keywords={station.station_code + ', ' + station.station_name + ', ' + station.division + ' station details, station information, trains visiting station'}
            url={fullUrl}/>
          {stationInfoForm()}
          <br/>
          <div className="panel panel-default">
            <div className="panel-heading"
                 style={{background: '#4285F4', padding: '10px 15px 15px 15px', margin: '0px'}}>
              <h1 style={{fontSize: '20px', color: '#FFFFFF'}}>{station.station_name} - {station.station_code} {stationInfo.trains.length} Trains</h1>
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
          <div className="panel panel-default" style={{fontSize: '13px', overflow: 'hidden'}}>
            <div className="panel-body">
              <table className="table table-striped table-hover ">
                <thead>
                <tr>
                  <td>Name</td>
                  <td>Days</td>
                  <td>Arrival</td>
                  <td className={style.x}>Dep.</td>
                  <td>Type</td>
                </tr>
                </thead>
                <tbody>
                {trainsList}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
