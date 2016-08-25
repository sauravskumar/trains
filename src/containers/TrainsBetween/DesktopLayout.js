/**
 * Created by saurav on 24/8/16.
 */
import React from 'react';
import style from './TrainsBetween.scss';
export default function DesktopLayout({trainBetweenList}) {
  const desktopLayout = (list) => {
    return (
      <tbody itemScope
             itemType="http://schema.org/TrainTrip">
      {list.map(journey => {
        return (
          <tr key={Date.now() + Math.random()} itemScope
              itemType="http://schema.org/TrainTrip">
            <td itemProp="trainNumber">{journey.train.train_code}</td>
            <td itemProp="trainName">{journey.train.train_name}</td>
            <td itemProp="departureStation">
              {journey.src.station_name} - {journey.src.station_code}
              <div className={style.tbSmall}>
                {journey.src.dist_from_src > 0 ? journey.src.dist_from_src + ' km. ' + trainBetweenList.actual_src.station_code : ''}
              </div>
            </td>
            <td
              itemProp="departureTime">{journey.src_route.departure_time.toFixed(2).replace('.', ':')}</td>
            <td itemProp="arrivalStation">{journey.dest.station_name} - {journey.dest.station_code}
              <div className={style.tbSmall}>
                {journey.dest.dist_from_dest > 0 ? journey.dest.dist_from_dest + ' km. ' + trainBetweenList.actual_dest.station_code : ''}
              </div>
            </td>
            <td itemProp="arrivalTime">
              {journey.dest_route.arrival_time.toFixed(2).replace('.', ':')}
            </td>
            <td>
              {(journey.dest_route.position.low - journey.src_route.position.low - 1) > 0 ? journey.dest_route.position.low - journey.src_route.position.low - 1 : ''}
            </td>
            <td>
              <div className="row">
                <div className={'col-xs-12 ' + style.days}>
                  {journey.train.days.map(day => {
                    return (
                      <span key={Date.now() + Math.random()}>{day ? day : ''}</span>
                    );
                  })}
                </div>
              </div>
            </td>
            <td>{journey.duration}</td>
            <td>
              <div className="row">
                <div className="col-xs-12">
                  {journey.train.classes.map(_class => {
                    return (
                      <span key={Date.now() + Math.random()}>{_class ? _class + ' ' : ' '}</span>
                    );
                  })}
                </div>
              </div>
            </td>
          </tr>
        );
      })}</tbody>
    );
  };
  return (

    <div className="panel panel-default" style={{fontSize: '13px'}}>
      <div className="panel-body">
        <table className="table table-striped table-hover ">
          <thead>
          <tr style={{fontSize: '13px', color: '#555'}}>
            <td>Number</td>
            <td>Name</td>
            <td>Source</td>
            <td>Departure.</td>
            <td>Destination</td>
            <td>Arrival</td>
            <td>Halts</td>
            <td>Days</td>
            <td>Duration</td>
            <td>Class</td>
          </tr>
          </thead>
          {desktopLayout(trainBetweenList.exactMatch)}
          <tbody>
          <tr style={{background: '#4285F4', fontSize: '13px', color: '#fff'}}>
            <td colSpan="100" className="text-center"><b>Nearby Stations</b></td>
          </tr>
          </tbody>
          {desktopLayout(trainBetweenList.json)}
        </table>
      </div>
    </div>
  );
}
