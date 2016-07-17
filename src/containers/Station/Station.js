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
    params: PropTypes.object
  };
  render() {
    const {stationInfo, params} = this.props;
    // console.log(stationInfo);
    return (
      <div style={{maxWidth: '650px'}}>
        <StationInfo stationInfo={stationInfo} params={params}/>
      </div>
    );
  }
}
