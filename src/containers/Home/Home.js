import React, { Component } from 'react';
// import { Link } from 'react-router';
import { TrainBetweenForm } from 'components';
// import config from '../../config';
// import style from './Home.scss';
// import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {asyncConnect} from 'redux-connect';
import {loadFooter} from 'redux/modules/search';
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    const promises = [];
    promises.push(dispatch(loadFooter()));
    return Promise.all(promises);
  }
}])
export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <img src={require('./logo.png')} alt="" className="center-block"/>
        <TrainBetweenForm/>
      </div>
    );
  }
}
