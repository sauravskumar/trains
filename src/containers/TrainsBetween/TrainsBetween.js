/**
 * Created by saurav on 8/7/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {TrainBetweenForm, PlaceHolder, AppHelmet} from 'components';
import {asyncConnect} from 'redux-connect';
import {loadTrainsBetween} from 'redux/modules/search';
import {onPageSetStatus} from 'redux/modules/app';
import style from './TrainsBetween.scss';
import {bindActionCreators} from 'redux';
// import { Link } from 'react-router';
// import config from '../../config';

@asyncConnect([{
  promise: ({store: {dispatch}, params: {param}}) => {
    const promises = [];
    if (param) {
      // console.log(param);
      const stations = param.split('-to-');
      // console.log(stations[0].split('-')[0], stations[1].split('-')[0]);
      // promises.push(dispatch(loadTrainsBetween(stations[0].split('-')[0], stations[1].split('-')[0])));
      promises.push(dispatch(loadTrainsBetween(stations[0].split('-').pop(), stations[1].split('-').pop())));
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
  state => ({
    trainBetweenList: state.search.trainBetweenList,
    mobile: state.app.mobile
  }),
  dispatch => (bindActionCreators({onPageSetStatus}, dispatch))
)
export default class TrainsBetween extends Component {
  static propTypes = {
    trainBetweenList: PropTypes.object,
    params: PropTypes.object,
    location: PropTypes.object,
    mobile: PropTypes.bool,
    onPageSetStatus: PropTypes.func,
  };

  componentWillMount = () => {
    // Update status by executing redux-action
    if (this.props.trainBetweenList.json.length < 1) {
      this.props.onPageSetStatus(404);
    }
  };

  getRandom = (arr, number) => {
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

  capitalize_Words = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  headTitle = (param, number) => {
    const {fullName, codeName} = this.splitUrl(param);
    return `${this.capitalize_Words(fullName).replace(' To ', ' to ')} | ${codeName.toUpperCase().replace(' TO ', ' to ')} - ${number} Trains | Atmed Trains`;
  };

  splitUrl = (param) => {
    const url = param.split('-to-');
    url[0] = url[0].split('-');
    url[1] = url[1].split('-');
    const codes = [url[0].pop(), ' to ', url[1].pop()].join('');
    // const to = url.indexOf('to');
    const fullName = [url[0].join(' '), ' to ', url[1].join(' ')].join('');
    // const codeName = codes.join(' ');
    return {fullName: fullName, codeName: codes};
  };

  description = (param, journey) => {
    const {fullName, codeName} = this.splitUrl(param);
    const number = journey.json.length;
    const bestTrain = journey.bestTrain;
    const keywords = ['trains between stations', 'pnr status',
      'railway enquiry', 'railway reservation', 'railway enquiry',
      'train enquiry', 'train timings', 'train running status',
      'seat availability', 'train info', 'ticket price',
      'indian railway enquiry', 'Train Number', 'railway fare enquiry',
      'train no', 'rail info', 'india rail info', 'erail',
      'irctc train timings', 'railway ticket booking', 'railway booking',
      'indian railway time table', 'railway time table', 'seat fare', 'online train booking'];
    const descEnd = this.getRandom(keywords, 3).join(', ').toLowerCase();
    return `${number} trains found ${codeName.split(' to ')[0].toUpperCase()}/${fullName.split(' to ')[0].toUpperCase()} to ${codeName.split(' to ')[1].toUpperCase()}/${fullName.split(' to ')[1].toUpperCase()}. Best Train ${bestTrain.train.all_data[0]} - ${bestTrain.train.all_data[1]}. Duration ${bestTrain.duration} Get ${descEnd}.`;
  };

  keywords = (param, number) => {
    const {fullName, codeName} = this.splitUrl(param);
    return `${fullName} Trains, ${codeName} Trains, ${number} Trains from ${fullName}, Trains between ${fullName},  Trains between ${codeName}`;
  };

  trainNotFoundPanelHeading = (param) => {
    let url = param.split('-to-'); // eslint-disable-line
    url[0] = url[0].split('-');
    url[1] = url[1].split('-');
    const codes = [url[0].pop(), url[1].pop()];
    // return `${codes[0]} ${url.slice(0, to).join(' ')} to ${codes[2]} ${url.slice(to).join(' ')}`;
    return (
      <div className="panel-heading text-center" style={{padding: '0px', margin: '0px'}}>
        <div style={{background: '#E53935', padding: '1px'}}>
          <h1 style={{fontSize: '24px', color: '#FFFFFF'}}>{url[0].join(' ').toUpperCase()}
            <b>{codes[0].toUpperCase()}</b>&nbsp;&nbsp;to&nbsp;&nbsp;{url[1].join(' ').toUpperCase()}
            <b>{codes[1].toUpperCase()}</b>
          </h1>
        </div>
        <div style={{background: '#EF5350', padding: '1px'}}>
          <h2 style={{fontSize: '18px', color: '#FFEBEE'}}>0 Trains</h2>
        </div>
      </div>
    );
  };

  panelHeading = (param, journey) => {
    // console.log('param-> ', param);
    let url = param.split('-to-'); // eslint-disable-line
    url[0] = url[0].split('-');
    url[1] = url[1].split('-');
    const codes = [url[0].pop(), url[1].pop()];
    // const to = url.indexOf('to');
    // url.splice(to, 1);
    // return `${codes[0]} ${url.slice(0, to).join(' ')} to ${codes[2]} ${url.slice(to).join(' ')}`;
    return (
      <div className="panel panel-default text-capitalize">
        <div className="panel-heading text-center" style={{padding: '0px', margin: '0px'}}>
          <div style={{background: '#4285F4', padding: '1px'}}>
            <h1 style={{
              fontSize: '18px',
              color: '#FFFFFF'
            }}><b>{url[0].join(' ').toUpperCase()}</b> to <b>{url[1].join(' ').toUpperCase()}</b>&nbsp;&nbsp;
              |&nbsp;&nbsp;
              <b>{codes[0].toUpperCase()}</b> to <b>{codes[1].toUpperCase()}</b>
            </h1>
          </div>
          <div style={{background: '#3367D6', padding: '1px'}}>
            {journey.json.length ? <h2 style={{fontSize: '14px', color: '#C2D2F3'}}>{journey.json.length} Trains · Best
              Train {journey.bestTrain.train.train_code} {journey.bestTrain.train.train_name} ·
              Duration {journey.bestTrain.duration}</h2> :
              <h2 style={{fontSize: '14px', color: '#C2D2F3'}}>0 Trains</h2>}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {trainBetweenList, params, location, mobile} = this.props;
    // console.log('trainBetween mobile', mobile);
    const url = params.param;
    const fullUrl = location.pathname;
    if (!params || !params.param) {
      return (
        <div className="row text-capitalize">
          <div className="col-xs-12 col-sm-8">
            <TrainBetweenForm/>
            <br/>
            <PlaceHolder/>
          </div>
        </div>
      );
    }
    if (trainBetweenList.json.length < 1) {
      return (
        <div className="row text-capitalize">
          <div className="col-xs-12 col-sm-8">
            <TrainBetweenForm/>
            <br/>
            {this.trainNotFoundPanelHeading(url, null)}
            <PlaceHolder/>
          </div>
        </div>
      );
    }
    if (!mobile) {
      return (
        <div className="row text-capitalize">
          <AppHelmet title={this.headTitle(url, trainBetweenList.json.length)}
                     description={this.description(url, trainBetweenList)}
                     keywords={this.keywords(url, trainBetweenList.json.length)}
                     url={fullUrl}/>
          <div className="col-xs-12 col-sm-12">
            <TrainBetweenForm/>
            <br/>
            <div className="panel panel-default">
              {this.panelHeading(url, trainBetweenList)}
            </div>
            <div className="panel panel-default" style={{fontSize: '13px'}}>
              <div className="panel-body">
                <table className="table table-striped table-hover ">
                  <thead>
                  <tr>
                    <td>Number</td>
                    <td>Name</td>
                    <td>Source</td>
                    <td>Arr.</td>
                    <td>Halt</td>
                    <td>Dep.</td>
                    <td>Dest.</td>
                    <td>Arr.</td>
                    <td>Days</td>
                    <td>Duration</td>
                    <td>Class</td>
                  </tr>
                  </thead>
                  <tbody itemScope
                         itemType="http://schema.org/TrainTrip">
                  {trainBetweenList.json.map(journey => {
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
                        <td >{journey.src_route.arrival_time.toFixed(2).replace('.', ':')}</td>
                        <td>{journey.src_route.halt_duration.low}m.</td>
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
                  })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="row text-capitalize">
        <AppHelmet title={this.headTitle(url, trainBetweenList.json.length)}
                   description={this.description(url, trainBetweenList)}
                   keywords={this.keywords(url, trainBetweenList.json.length)}
                   url={fullUrl}/>
        <div className="col-xs-12 col-sm-8">
          <TrainBetweenForm/>
          <br/>
          <div className="panel panel-default">
            {this.panelHeading(url, trainBetweenList)}
          </div>
          <div className="panel panel-default">
            <div className="panel-body">
              {trainBetweenList.json.map(journey => {
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
          </div>
          <small style={{color: '#aaa'}}>*All nearby distances are approximations</small>
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
