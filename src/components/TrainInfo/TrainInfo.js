/**
 * Created by saurav on 8/7/16.
 */
import React, {Component, PropTypes} from 'react';
import TrainInfoForm from './TrainInfoForm';
import style from './TrainInfo.scss';

export default class TrainInfo extends Component {
  static propTypes = {
    params: PropTypes.object,
    train: PropTypes.object
  };

  render() {
    const {train, params} = this.props;
    if (!params.param) {
      return (
        <div style={{maxWidth: '650px'}}>
          <TrainInfoForm/>
          <br/>
          <br/>
          {/* <i className="fa fa-train fa-30x text-center" aria-hidden="true" style={{color: '#FAFAFA', display: 'block', fontSize: '150px'}}/> */}
        </div>
      );
    }
    return (
      <div style={{maxWidth: '650px'}}>
        <TrainInfoForm/>
        <br/>
        <div className="panel panel-default">
          <div className="panel-body">
            {train.code} - {train.name}<br/>
            {train.all_data[2]} -
            {train.all_data[3]} To&nbsp;
            {train.all_data[4]} -
            {train.all_data[5]}<br/>
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
        <div className="panel panel-default">
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
    );
  }
}