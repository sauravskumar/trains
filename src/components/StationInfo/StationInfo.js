/**
 * Created by saurav on 8/7/16.
 */
import React, {Component, PropTypes} from 'react';
import StationInfoForm from './StationInfoForm';
import style from './StationInfo.scss';

export default class StationInfo extends Component {
  static propTypes = {
    params: PropTypes.object,
    stationInfo: PropTypes.object
  };

  render() {
    const {stationInfo, params} = this.props;
    // console.log('stationInfo', station[0]._fields[1]);
    let station = {};
    if (stationInfo) {
      station = stationInfo.station.properties;
    }
    if (!params.param) {
      return (
        <div>
          <StationInfoForm/>
        </div>
      );
    }
    return (
      <div style={{maxWidth: '650px'}}>
        <StationInfoForm/>
        <br/>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row">
              <div className="col-xs-6">
                Name: {station.station_code} - {station.station_name}<br/>
                Division: {station.division}<br/>
                Zone: {station.zone}
              </div>
              <div className="col-xs-6">
                <div className={style.pimg}
                     style={{backgroundImage: 'url(/images/placeholder/taj.jpg)'}}/>
              </div>
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
    );
  }
}
