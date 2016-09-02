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
import {loadStationInfo, loadFooter} from 'redux/modules/search';
import {connect} from 'react-redux';
@asyncConnect([{
  promise: ({store: {dispatch}, params: {param}}) => {
    const promises = [];
    if (param) {
      // console.log(param.split('-')[0]);
      const stationCode = param.split('-').pop();
      promises.push(dispatch(loadStationInfo(stationCode)));
      // promises.push(dispatch(loadFooter(`?stationCode=${stationCode}`)));
    }
    promises.push(dispatch(loadFooter()));
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
      <div className="container">
        <StationInfo stationInfo={stationInfo} params={params} fullUrl={fullUrl}/></div>
    );
  }
}
