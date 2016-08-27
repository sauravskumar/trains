/**
 * Created by saurav on 8/7/16.
 */
import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
import { TrainInfo } from 'components';
// import config from '../../config';
// import Helmet from 'react-helmet';
import {asyncConnect} from 'redux-connect';
import {loadTrainInfo, loadFooter} from 'redux/modules/search';
import {connect} from 'react-redux';
@asyncConnect([{
  promise: ({store: {dispatch}, params: {param}}) => {
    const promises = [];
    if (param) {
      promises.push(dispatch(loadTrainInfo(param.split('-')[0])));
      promises.push(dispatch(loadFooter(`?code=${param.split('-')[0]}`)));
    }else {
      promises.push(dispatch(loadFooter()));
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
