/**
 * Created by saurav on 8/7/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {TrainBetweenForm, PlaceHolder, AppHelmet, GoogleMaps} from 'components';
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
      // console.log(stations, stations[0][0], stations[1].split('-')[0]);
      promises.push(dispatch(loadTrainsBetween(stations[0], stations[1].split('-')[0])));
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
    if (!this.props.params.param) {
      this.props.onPageSetStatus(200);
    } else if ((this.props.trainBetweenList.json.length + this.props.trainBetweenList.exactMatch.length) < 1) {
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

  // headTitle = (param, number) => {
  //   const {fullName, codeName} = this.splitUrl(param);
  //   return `${this.capitalize_Words(fullName).replace(' To ', ' to ')} | ${codeName.toUpperCase().replace(' TO ', ' to ')} - ${number} Trains | Atmed Trains`;
  // };
  headTitle = (param, number) => {
    const url = param.split('-');
    const codes = url.splice(0, 3);
    // const to = url.indexOf('to');
    const first = url.join(' ');
    const second = codes.join(' ');
    return `${this.capitalize_Words(first)} | ${second.toUpperCase().replace(' TO ', ' to ')} - ${number} Trains | Atmed Trains`;
  };
  // splitUrl = (param) => {
  //   const url = param.split('-to-');
  //   url[0] = url[0].split('-');
  //   url[1] = url[1].split('-');
  //   const codes = [url[0].pop(), ' to ', url[1].pop()].join('');
  //   // const to = url.indexOf('to');
  //   const fullName = [url[0].join(' '), ' to ', url[1].join(' ')].join('');
  //   // const codeName = codes.join(' ');
  //   return {fullName: fullName, codeName: codes};
  // };
  splitUrl = (param) => {
    const url = param.split('-');
    const codes = url.splice(0, 3);
    // const to = url.indexOf('to');
    const fullName = url.join(' ');
    const codeName = codes.join(' ');
    return {fullName: fullName, codeName: codeName};
  };
  description = (param, journey) => {
    const {fullName, codeName} = this.splitUrl(param);
    const number = journey.json.length + journey.exactMatch.length;
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
    return `${number} trains found from [${codeName.split(' to ')[0].toUpperCase()}]${fullName.split(' to ')[0].toUpperCase()} to [${codeName.split(' to ')[1].toUpperCase()}]${fullName.split(' to ')[1].toUpperCase()}. Best Train ${bestTrain.train.all_data[0]} - ${bestTrain.train.all_data[1]}. Duration ${bestTrain.duration} Get ${descEnd}.`;
  };

  keywords = (param, number) => {
    const {fullName, codeName} = this.splitUrl(param);
    return `${fullName} Trains, ${codeName} Trains, ${number} Trains from ${fullName}, Trains between ${fullName},  Trains between ${codeName}`;
  };

  trainNotFoundPanelHeading = (param) => {
    const url = param.split('-');
    return (
      <div className="panel-heading text-center" style={{padding: '0px', margin: '0px'}}>
        <div style={{background: '#E53935', padding: '1px'}}>
          <h1 style={{fontSize: '18px', color: '#FFFFFF'}}>
            <b>{url.splice(0, 3).join(' ')}</b> | {url.join(' ')} Trains
          </h1>
        </div>
        <div style={{background: '#EF5350', padding: '1px'}}>
          <h2 style={{fontSize: '18px', color: '#FFEBEE'}}>0 Trains</h2>
        </div>
      </div>
    );
  };

  panelHeading = (param, journey) => {
    const url = param.split('-');
    return (
      <div className="panel panel-default text-capitalize">
        <div className="panel-heading text-center" style={{padding: '0px', margin: '0px'}}>
          <div style={{background: '#4285F4', padding: '1px'}}>
            <h1 style={{fontSize: '18px', color: '#FFFFFF'}}>
              <b>{url.splice(0, 3).join(' ')}</b> | {url.join(' ')} Trains
            </h1>
          </div>
          <div style={{background: '#3367D6', padding: '1px'}}>
            {(journey.json.length + journey.exactMatch.length) ?
              <h2 style={{fontSize: '14px', color: '#C2D2F3'}}>{journey.json.length + journey.exactMatch.length} Trains
                · Best
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
    if ((trainBetweenList.json.length + trainBetweenList.exactMatch.length) < 1) {
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

    const getDays = (daysArr) => {
      daysArr[0] = daysArr[0] ? 'sunday' : '';
      daysArr[1] = daysArr[1] ? 'monday' : '';
      daysArr[2] = daysArr[2] ? 'tuesday' : '';
      daysArr[3] = daysArr[3] ? 'wednesday' : '';
      daysArr[4] = daysArr[4] ? 'thursday' : '';
      daysArr[5] = daysArr[5] ? 'friday' : '';
      daysArr[6] = daysArr[6] ? 'saturday' : '';
      return daysArr ? daysArr.filter(Boolean) : [];
    };

    const summary = () => {
      return (
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              Summary
            </div>
            <div className="panel-body">
              <ul>
                <li>There are {trainBetweenList.exactMatch.length} trains running directly
                  from <b>{trainBetweenList.actual_src.code_name}</b> to <b>{trainBetweenList.actual_dest.code_name}</b>
                </li>
                <li>{trainBetweenList.json.length} trains are available from nearby stations</li>
                <li>Train number {trainBetweenList.bestTrain.train.train_code} -&nbsp;
                  {trainBetweenList.bestTrain.train.train_name} is the fastest train which
                  takes {trainBetweenList.bestTrain.duration}</li>
                <li>Distance between {trainBetweenList.actual_src.station_name}&nbsp;
                  to {trainBetweenList.actual_dest.station_name} is approximately&nbsp;
                  {trainBetweenList.exactMatch.length ? trainBetweenList.exactMatch[0].dest_route.distance.low :
                    trainBetweenList.json[0].distance.dest_route.low}
                  km
                </li>
                <li>Train {trainBetweenList.bestTrain.train.train_code} -&nbsp;
                  {trainBetweenList.bestTrain.train.train_name} is
                  available {trainBetweenList.bestTrain.train.days.includes('') ?
                  'only on ' + getDays(trainBetweenList.bestTrain.train.days).join(', ') :
                    'all days'} from {trainBetweenList.actual_src.code_name}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
        ;
    };
    if (!mobile) {
      // ///////////////////////////////////////////////////////////////////////
      //                         DESKTOP LAYOUT
      // ///////////////////////////////////////////////////////////////////////
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
        <div className="row">
          <AppHelmet title={this.headTitle(url, trainBetweenList.json.length)}
                     description={this.description(url, trainBetweenList)}
                     keywords={this.keywords(url, trainBetweenList.json.length)}
                     url={fullUrl}/>
          <div className="col-xs-12 col-sm-12 text-capitalize">
            <TrainBetweenForm/>
            <br/>
            <div className="panel panel-default">
              {this.panelHeading(url, trainBetweenList)}
            </div>
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
          </div>
          <div className="col-xs-12 ">
            <div className="panel panel-default">
              <div className="panel-body">
                <div style={{padding: '0px', marginTop: '0px', height: '150px', overflow: 'hidden'}}>
                  <GoogleMaps trainBetweenList={trainBetweenList}/>
                </div>
              </div>
            </div>
          </div>
          {summary()}
          <small style={{color: '#aaa'}}>*All nearby distances are approximations</small>
        </div>
      );
    }

    // ///////////////////////////////////////////////////////////////////////
    //                         MOBILE LAYOUT
    // ///////////////////////////////////////////////////////////////////////
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

            {mobileLayout(trainBetweenList.exactMatch)}
          </div>
          <div className="panel panel-default">
            <div className="panel-heading text-center" style={{color: '#4285F4'}}>
              <b>Nearby Stations</b>
            </div>
            {mobileLayout(trainBetweenList.json)}
          </div>
        </div>
        <div className="col-xs-12 ">
          <div className="panel panel-default">
            <div className="panel-body">
              <div style={{padding: '0px', marginTop: '0px', height: '150px', overflow: 'hidden'}}>
                <GoogleMaps/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 ">
          <div className="panel panel-default">
            <div className="panel-body">
              <div style={{padding: '0px', marginTop: '0px', height: '150px', overflow: 'hidden'}}>
                <GoogleMaps/>
              </div>
            </div>
          </div>
        </div>
        {summary()}
        <small style={{color: '#aaa'}}>*All nearby distances are approximations</small>
      </div>
    );
  }
}
