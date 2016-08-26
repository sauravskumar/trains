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
  state => ({trainInfo: state.search.trainInfo, status: state.search.status})
)
export default class Train extends Component {
  static propTypes = {
    trainInfo: PropTypes.object,
    params: PropTypes.object,
    location: PropTypes.object,
    status: PropTypes.object
  };
  render() {
    const {trainInfo, params, location, status} = this.props;
    const fullUrl = location.pathname;
    return (
        <TrainInfo train={trainInfo} params={params} status={status} fullUrl={fullUrl}/>
    );
  }
}
