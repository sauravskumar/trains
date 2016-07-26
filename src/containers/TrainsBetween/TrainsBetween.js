/**
 * Created by saurav on 8/7/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {TrainBetweenForm, PlaceHolder, AppHelmet} from 'components';
import {asyncConnect} from 'redux-connect';
import {loadTrainsBetween} from 'redux/modules/search';
import style from './TrainsBetween.scss';

// import { Link } from 'react-router';
// import config from '../../config';

@asyncConnect([{
  promise: ({store: {dispatch}, params: {param}}) => {
    const promises = [];
    if (param) {
      // console.log(param);
      const stations = param.split('-to-');
      // console.log(stations[0].split('-')[0], stations[1].split('-')[0]);
      promises.push(dispatch(loadTrainsBetween(stations[0].split('-')[0], stations[1].split('-')[0])));
    }

    // if (!isInfoLoaded(getState())) {
    //   promises.push(dispatch(loadInfo()));
    // }
    // if (!isAuthLoaded(getState())) {
    //   promises.push(dispatch(loadAuth()));
    // }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({trainBetweenList: state.search.trainBetweenList})
)
export default class TrainsBetween extends Component {
  static propTypes = {
    trainBetweenList: PropTypes.object,
    params: PropTypes.object,
    location: PropTypes.object
  };

  splitUrl = (param) => {
    const url = param.split('-');
    const codes = url.splice(0, 3);
    // const to = url.indexOf('to');
    const fullName = url.join(' ');
    const codeName = codes.join(' ');
    return {fullName: fullName, codeName: codeName};
  };

  headTitle = (param, number) => {
    const {fullName, codeName} = this.splitUrl(param);
    return `${fullName} | ${codeName} - ${number} Trains`;
  };

  description = (param, journey) => {
    const {fullName, codeName} = this.splitUrl(param);
    const number = journey.json.length;
    const bestTrain = journey.bestTrain;
    return `${number} trains for ${codeName} - ${fullName}. Best Train ${bestTrain.train.all_data[0]} - ${bestTrain.train.all_data[1]}, takes ${bestTrain.duration}`;
  };

  keywords = (param, number) => {
    const {fullName, codeName} = this.splitUrl(param);
    return `${fullName} Trains, ${codeName} Trains, ${number} Trains from ${fullName}, Trains between ${fullName},  Trains between ${codeName}`;
  };

  panelHeading = (param, journey) => {
    // console.log(url);
    const url = param.split('-');
    const codes = url.splice(0, 3);
    const to = url.indexOf('to');
    url.splice(to, 1);
    // return `${codes[0]} ${url.slice(0, to).join(' ')} to ${codes[2]} ${url.slice(to).join(' ')}`;
    return (
      <div className="panel-heading text-center" style={{padding: '0px', margin: '0px'}}>
        <div style={{background: '#4285F4', padding: '1px'}}>
          <h1 style={{fontSize: '20px', color: '#FFFFFF'}}>{codes[0]} {url.slice(0, to).join(' ')}
            to {codes[2]} {url.slice(to).join(' ')}</h1>
        </div>
        <div style={{background: '#3367D6', padding: '1px'}}>
          {journey.json.length ? <h2 style={{fontSize: '13px', color: '#C2D2F3'}}>{journey.json.length} Trains · Best Train {journey.bestTrain.train.train_code} {journey.bestTrain.train.train_name} · Duration {journey.bestTrain.duration}</h2> : <h2 style={{fontSize: '14px', color: '#C2D2F3'}}>{journey.json.length} Trains</h2>}
        </div>
      </div>
    );
  };

  render() {
    const {trainBetweenList, params, location} = this.props;
    const url = params.param;
    const fullUrl = location.pathname;
    if (!params || !params.param) {
      return (
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <TrainBetweenForm/>
            <br/>
            <PlaceHolder/>
          </div>
        </div>
      );
    }
    if (trainBetweenList.json.length === 0) {
      return (
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <TrainBetweenForm/>
            <br/>
            {this.panelHeading(url, null)}
            <PlaceHolder/>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <AppHelmet title={this.headTitle(url, trainBetweenList.json.length)}
                   description={this.description(url, trainBetweenList)}
                   keywords={this.keywords(url, trainBetweenList.json.length)}
                   url={fullUrl}/>
        <div className="col-xs-12 col-sm-8">
          <TrainBetweenForm/>
          <br/>
          <div className="panel panel-default">
            {this.panelHeading(url, trainBetweenList)}
            <div className="panel-body">
              {trainBetweenList.json.map(journey => {
                return (
                  <div key={Date.now() + Math.random()} className={'row ' + style.journey} itemScope
                       itemType="http://schema.org/TrainTrip">
                    <div className="col-xs-3 text-left">
                      <div itemProp="departureStation"><h5>{journey.src.station_code}</h5><span
                        className="hidden"> - </span>{journey.src.station_name}</div>
                      <span className={style.tbSmall}>
                      {journey.src.dist_from_src > 0 ? journey.src.dist_from_src + '* km. ' + trainBetweenList.actual_src.station_code : ''}
                    </span>
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
                      <div itemProp="arrivalStation"><h5>{journey.dest.station_code}</h5><span
                        className="hidden"> - </span>{journey.dest.station_name}</div>
                      <span className={style.tbSmall}>
                      {journey.dest.dist_from_dest > 0 ? journey.dest.dist_from_dest + '* km. ' + trainBetweenList.actual_dest.station_code : ''}
                    </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <div className="col-xs-12 col-sm-4">
         <div className="panel panel-default">
         <div className="panel-body">
         <div style={{padding: '0px', marginTop: '0px', height: '150px', overflow: 'hidden'}}>
         <GoogleMaps/>
         </div>
         </div>
         </div>
         <div className="panel panel-default">
         <div className="panel-body">
         price
         </div>
         </div>
         </div> */}
      </div>
    );
  }
}
