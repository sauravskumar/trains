/**
 * Created by saurav on 8/7/16.
 */
import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import { CounterButton, GithubButton } from 'components';
// import config from '../../config';
// import Helmet from 'react-helmet';
import { StationInfo } from 'components';
import {asyncConnect} from 'redux-connect';
import {loadStationInfo} from 'redux/modules/search';
import {connect} from 'react-redux';
import { AppHelmet } from 'components';
@asyncConnect([{
  promise: ({store: {dispatch}, params: {param}}) => {
    const promises = [];
    if (param) {
      console.log(param.split('-')[0]);
      promises.push(dispatch(loadStationInfo(param.split('-')[0])));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({stationInfo: state.search.stationInfo})
)
export default class Station extends Component {
  static propTypes = {
    stationInfo: PropTypes.object,
    params: PropTypes.object,
    location: PropTypes.object
  };
  render() {
    const {stationInfo, params, location} = this.props;
    const fullUrl = location.pathname;
    return (
      <div style={{maxWidth: '650px'}}>
        <AppHelmet title={'PNR Status'}
                   description={'Check train PNR Number Status. Get seat availability and register for train alerts.'}
                   keywords={'pnr status, pnr status check, pnr number check, pnr number status, berth availability'}
                   url={fullUrl}/>
        <StationInfo stationInfo={stationInfo} params={params}/>
      </div>
    );
  }
}
