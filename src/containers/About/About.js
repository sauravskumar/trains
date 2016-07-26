import React, {Component} from 'react';
import Helmet from 'react-helmet';
// import { MiniInfoBar } from 'components';

export default class About extends Component {

  render() {
    return (
      <div className="row">
        <Helmet title="About Us"/>
        <div className="col-xs-12">
          <h1>About</h1>
        </div>
      </div>
    );
  }
}
