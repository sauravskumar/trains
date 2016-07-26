/**
 * Created by saurav on 8/7/16.
 */
import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
import { TrainInfo } from 'components';
// import config from '../../config';
// import Helmet from 'react-helmet';
import {asyncConnect} from 'redux-connect';
import {loadTrainInfo} from 'redux/modules/search';
import {connect} from 'react-redux';
import { AppHelmet } from 'components';
@asyncConnect([{
  promise: ({store: {dispatch}, params: {param}}) => {
    const promises = [];
    if (param) {
      // console.log(param);
      // const stations = param.split('-to-');
      // console.log(stations[0].split('-')[0], stations[1].split('-')[0]);
      promises.push(dispatch(loadTrainInfo(param.split('-')[0])));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({trainInfo: state.search.trainInfo})
)
export default class Train extends Component {
  static propTypes = {
    trainInfo: PropTypes.object,
    params: PropTypes.object,
    location: PropTypes.object
  };
  render() {
    const {trainInfo, params, location} = this.props;
    const fullUrl = location.pathname;
    return (
      <div style={{maxWidth: '650px'}}>
      <AppHelmet title={'PNR Status'}
                 description={'Check train PNR Number Status. Get seat availability and register for train alerts.'}
                 keywords={'pnr status, pnr status check, pnr number check, pnr number status, berth availability'}
                 url={fullUrl}/>
        <TrainInfo train={trainInfo} params={params}/>
      </div>
    );
  }
}
