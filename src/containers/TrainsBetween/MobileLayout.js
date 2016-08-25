/**
 * Created by saurav on 24/8/16.
 */
import React from 'react';
import style from './TrainsBetween.scss';
export default function DesktopLayout({trainBetweenList}) {
  const mobileLayout = (list) => {
    return (
      <div className="panel-body">
        {list.map(journey => {
          return (
            <div key={Date.now() + Math.random()} className={'row ' + style.journey} itemScope
                 itemType="http://schema.org/TrainTrip">
              <div className="col-xs-3 text-left">
                <div itemProp="departureStation">
                  <span className="hidden"> - </span>{journey.src.station_name}
                  <h5>{journey.src.station_code}</h5>
                </div>
                <div className={style.tbSmall}>
                  {journey.src.dist_from_src > 0 ? journey.src.dist_from_src + ' km. ' + trainBetweenList.actual_src.station_code : ''}
                </div>
              </div>
              <div className="col-xs-6 text-center">
                <div className="row">
                  <div className={'col-xs-12 ' + style.trainName}>
                    <nobr><span itemProp="trainNumber">{journey.train.train_code}</span> - <span
                      itemProp="trainName">{journey.train.train_name}</span></nobr>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <b>
                            <span
                              itemProp="departureTime">{journey.src_route.departure_time.toFixed(2).replace('.', ':')}&nbsp;</span>
                      - <span
                      itemProp="arrivalTime">{journey.dest_route.arrival_time.toFixed(2).replace('.', ':')}</span>
                    </b>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6 text-right">{journey.duration}</div>
                  <div className="col-xs-6 text-left">{journey.dest_route.distance.low} km</div>
                </div>
                <div className="row">
                  <div className={'col-xs-12 ' + style.days}>
                    {journey.train.days.map(day => {
                      return (
                        <span key={Date.now() + Math.random()}>{day ? day : ''}</span>
                      );
                    })}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    {journey.train.classes.map(_class => {
                      return (
                        <span key={Date.now() + Math.random()}>{_class ? _class + ' ' : ' '}</span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-xs-3 text-left">
                <div itemProp="arrivalStation">
                  <span className="hidden"> - </span>{journey.dest.station_name}
                  <h5>{journey.dest.station_code}</h5>
                </div>
                <div className={style.tbSmall}>
                  {journey.dest.dist_from_dest > 0 ? journey.dest.dist_from_dest + ' km. ' + trainBetweenList.actual_dest.station_code : ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div>
      <div className="panel panel-default">
        {mobileLayout(trainBetweenList.exactMatch)}
      </div>
      <div className="panel panel-default">
        <div className="panel-heading text-center" style={{color: '#4285F4'}}>
          <b>Nearby Stations</b>
        </div>
        {mobileLayout(trainBetweenList.json)}
      </div>
    </div>
  );
}
