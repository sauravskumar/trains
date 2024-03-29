/**
 * Created by saurav on 8/7/16.
 */
import React, {Component, PropTypes} from 'react';
import TrainInfoForm from './TrainInfoForm';
import style from './TrainInfo.scss';
import {AppHelmet} from 'components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {onPageSetStatus} from 'redux/modules/app';
import {updateStatus} from 'redux/modules/search';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
// import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';
import Info from './Info';
// import shouldPureComponentUpdate from 'react-pure-render/function';

@connect(
  state => ({mobile: state.app.mobile}),
  dispatch => (bindActionCreators({onPageSetStatus, updateStatus}, dispatch))
)
export default class TrainInfo extends Component {
  static propTypes = {
    params: PropTypes.object,
    train: PropTypes.object,
    fullUrl: PropTypes.string,
    onPageSetStatus: PropTypes.func,
    updateStatus: PropTypes.func,
    status: PropTypes.array,
    mobile: PropTypes.bool,
  };

  state = {
    statusInstance: 0
  };

  componentWillMount = () => {
    // Update status by executing redux-action
    if (!this.props.params.param) {
      this.props.onPageSetStatus(200);
    } else if (!this.props.train || !this.props.train.code) {
      this.props.onPageSetStatus(404);
    }
  };
  componentDidMount = () => {
    console.log('componentDidMount');
    if (this.props.train && !this.props.train.last_status_update) {
      this.updateStatus();
      return;
    }
    if (this.props.params.param &&
      this.props.train &&
      (Date.now() / 1000) - this.props.train.last_status_update > 5 * 0) {
      this.updateStatus();
    }
  };
  shouldComponentUpdate = (nextProps, nextState)=> {
    // console.log(nextProps, this.props);
    if (nextProps.fullUrl !== this.props.fullUrl) {
      if (nextProps.params.param) {
        this.updateStatus();
      }
      return true;
    }
    if (nextProps.status !== this.props.status) {
      console.log('wow');
      return true;
    }
    if (nextState !== this.state) {
      console.log('wow state');
      return true;
    }
    return false;
  };

  updateStatus = () => {
    console.log('updateStatus-> ', this.props.train.code);
    this.props.updateStatus(this.props.train.code);
  };
  handleSelect = (eventKey) => {
    // eventKey.preventDefault();
    console.log(`${eventKey}`);
    this.setState({statusInstance: parseInt(eventKey, 10)});
  };

  render() {
    const {train, params, status, fullUrl, mobile} = this.props;
    // console.log('render', this.props.train.code);
    // console.log('selectedStatus-> ', selectedStatus);
    let placeholder = '';
    if (params.param) {
      placeholder = params.param.replace(/-/g, ' ').toUpperCase();
    }
    const trainInfoForm = () => {
      return (<TrainInfoForm placeholder={placeholder}/>);
    };
    if (!params.param) {
      return (
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <AppHelmet title={'Atmed Trains: Train Running Status | Train Route | Train Info.'}
                       description={'Check Train running status, Berth availability, Train Route and seat fare of any train.'}
                       keywords={'Train status, live status, train info, train details, seat fare, seat availability'}
                       url={fullUrl}/>
            {trainInfoForm()}
            <br/>
            <div style={{width: '100%', textAlign: 'center'}}>
              <i className={'material-icons icon-color backgroundIcon'}>&#xE534;</i>
            </div>
          </div>
        </div>
      );
    }
    if (!train || !train.code) {
      return (
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <AppHelmet title={'Atmed Trains: Train Running Status | Train Route | Train Info.'}
                       description={'Check Train running status, Berth availability, Train Route and seat fare of any train.'}
                       keywords={'Train status, live status, train info, train details, seat fare, seat availability'}
                       url={fullUrl}/>
            {trainInfoForm()}
            <br/>
            <div className="panel panel-default" style={{width: '100%', textAlign: 'center'}}>
              <div className="panel-heading text-center" style={{padding: '0px', margin: '0px'}}>
                <div style={{background: '#E53935', padding: '1px'}}>
                  <h1 style={{fontSize: '24px', color: '#FFFFFF'}}>No Train Found</h1>
                </div>
              </div>
              <div style={{background: '#EF5350', padding: '1px'}}>
                <h2 style={{fontSize: '18px', color: '#FFEBEE'}}>{params.param}</h2>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const capitalizeWords = (str) => {
      return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };

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
    const keywords = ['trains between stations', 'pnr status',
      'railway enquiry', 'railway reservation', 'railway enquiry',
      'train enquiry', 'train timings', 'train running status',
      'seat availability', 'train info', 'ticket price',
      'indian railway enquiry', 'Train Number', 'railway fare enquiry',
      'train no', 'rail info', 'india rail info', 'erail', 'train route',
      'irctc train timings', 'railway ticket booking', 'railway booking', 'seat availability',
      'indian railway time table', 'railway time table', 'seat fare', 'online train booking'];
    const descEnd = getRandom(keywords, 3).join(', ').toLowerCase();
    const description = 'Train No.: ' + train.code + '. Train Name: ' + train.name +
      '. Starts from: ' + train.all_data[3].replace('.', ':') +
      '. Departure: ' + train.all_data[10].replace('.', ':') +
      '. Destination: ' + train.all_data[5].replace('.', ':') +
      '. Arrival: ' + train.all_data[11].replace('.', ':') +
      '. Get ' + descEnd + '.';
    let keys = 0;
    let selectedStatus = {}; // selectedStatus = status ? status[0].rakes[this.state.statusInstance] : {};
    // console.log(selectedStatus);
    if (status) {
      if (status[0].rakes.length > 0) {
        selectedStatus = status[0].rakes[this.state.statusInstance];
        keys = selectedStatus ? Object.keys(selectedStatus).length : 0;
      }
    }
    // console.log(keys);
    let fare = train.all_data[41].split(':'); // eslint-disable-line
    fare.shift();
    fare.shift();
    const lastClass = train.all_data[21].lastIndexOf('1');
    console.log(lastClass);
    // const classes = train.classes;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-8">
          <AppHelmet
            title={`${capitalizeWords(train.name)} (Train No. ${train.code}) | ${train.all_data[2]}/${train.all_data[3]} to ${train.all_data[4]}/${train.all_data[5]} | Atmed Trains`}
            description={description}
            keywords={'Train running status, train info, seat fare, berth availability'}
            url={fullUrl}/>
          {trainInfoForm()}
          <br/>
          <div className="panel panel-default text-capitalize" itemScope itemType="http://schema.org/TrainTrip">
            <div className="panel-heading"
                 style={{background: '#4285F4', padding: '10px 15px 15px 15px'}}>
              <h1 style={{fontSize: '20px', color: '#FFFFFF'}}><span itemProp="trainNumber">
                {train.code}</span> - <span itemProp="trainName">{train.name}</span>
              </h1>
            </div>
            <div style={{background: '#3367D6', margin: '0px'}}>
              <div className="row">
                <div className="col-xs-12">
                  <h2 style={{fontSize: '15px', paddingLeft: '15px', color: '#C2D2F3'}}>
                    <span itemProp="departureStation">{train.all_data[2]}&nbsp;
                      - <b>{train.all_data[3]}</b></span>&nbsp;&nbsp;To&nbsp;&nbsp;
                    <span itemProp="arrivalStation">{train.all_data[4]} - <b>{train.all_data[5]}</b></span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="panel-body" style={{margin: '15px'}}>
              Start: <span itemProp="departureTime">{train.all_data[10].replace('.', ':')}</span>&nbsp;·&nbsp;
              End: <span itemProp="arrivalTime">{train.all_data[11].replace('.', ':')}</span>&nbsp;·&nbsp;
              <span>Duration: {train.all_data[12].replace('.', ':')}</span>&nbsp;·&nbsp;
              {train.type}<br/>
              <div className={style.days}>
                Days:
                {train.days.map(day => {
                  return (<span key={Date.now() + Math.random()}>{day}</span>);
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
            <div className="panel-footer">
              <div className="text-center"><b>Select Instance</b></div>
              {(()=> {
                let index = 0;
                if (status) {
                  return (
                    <Nav bsStyle="tabs" justified activeKey={this.state.statusInstance} onSelect={this.handleSelect}>
                      {status[0].rakes.map(obj=> {
                        return (
                          <NavItem eventKey={index++} key={Date.now() + Math.random()}>{obj.startDate}</NavItem>
                        );
                      })}
                    </Nav>
                  );
                }
                return (
                  <div className="text-center">No running instance found</div>
                );
              })()}
            </div>
          </div>
          {mobile ? <MobileLayout keys={keys} selectedStatus={selectedStatus} train={train}/> :
            <DesktopLayout keys={keys} selectedStatus={selectedStatus} train={train}/>}
          <Info train={train} lastClass={lastClass} fare={fare}/>
          <div className="col-xs-12">
            <div className="text-center">Show trains from</div>
            <Nav bsStyle="tabs" justified>
              <LinkContainer
                to={(`/in/trains/${train.all_data[3]}-to-${train.all_data[5]}-${train.all_data[2]}-to-${train.all_data[4]}`).toLowerCase().replace(/ /g, '-')}>
                <NavItem>
                  {train.all_data[2]} - {train.all_data[3]}&nbsp;
                  To&nbsp;{train.all_data[4]} - {train.all_data[5]}</NavItem></LinkContainer>
              <LinkContainer
                to={(`/in/trains/${train.all_data[5]}-to-${train.all_data[3]}-${train.all_data[4]}-to-${train.all_data[2]}`).toLowerCase().replace(/ /g, '-')}>
                <NavItem>
                  {train.all_data[4]} - {train.all_data[5]}&nbsp;
                  To&nbsp;{train.all_data[2]} - {train.all_data[3]}</NavItem></LinkContainer>
            </Nav>
          </div>
        </div>
        <div className="col-xs-12 col-sm-4 text-center">
          <div className="row">
            <div className="col-xs-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Ticket Price
                </div>
                <div className="panel-body">
                  <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                      <td>Type</td>
                      <td>Fare</td>
                    </tr>
                    </thead>
                    <tbody>
                    {(()=> {
                      let index = -1;
                      return train.classes.map(obj=> {
                        index++;
                        if (obj) {
                          return (
                            <tr>
                              <td>{obj}</td>
                              <td>Rs. {fare[index].split(',')[0]}</td>
                            </tr>
                          );
                        }
                      });
                    })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <img
           src="http://res.cloudinary.com/atmed/v1476974353/new/300x600"
           className="aff-image"/> */}
        </div>
      </div>
    );
  }
}
