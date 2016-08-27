/**
 * Created by saurav on 27/8/16.
 */
import React, {Component, PropTypes} from 'react';
// import { Link } from 'react-router';
// import config from '../../config';
// import Helmet from 'react-helmet';
import {asyncConnect} from 'redux-connect';
import {loadCancelledTrains, loadFooter} from 'redux/modules/search';
import {connect} from 'react-redux';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    const promises = [];
    promises.push(dispatch(loadCancelledTrains()));
    promises.push(dispatch(loadFooter()));
    return Promise.all(promises);
  }
}])
@connect(
  state => ({cancelledTrains: state.search.cancelledTrains})
)
export default class Cancelled extends Component {
  static propTypes = {
    cancelledTrains: PropTypes.object,
  };

  state = {
    selected: 'allCancelledTrains'
  };
  handleSelect = (eventKey) => {
    // eventKey.preventDefault();
    console.log(`${eventKey}`);
    this.setState({selected: eventKey});
  };

  render() {
    const {cancelledTrains} = this.props;
    return (
      <div>
        <Nav bsStyle="tabs" justified activeKey={this.state.selected} onSelect={this.handleSelect}>
          <NavItem eventKey="allCancelledTrains">Fully Cancelled</NavItem>
          <NavItem eventKey="allPartiallyCancelledTrains">Partially Cancelled</NavItem>
        </Nav>
        <table className="table table-striped table-hover">
          <thead>
          <tr>
            <td>Sr.</td>
            <td>Train Number</td>
            <td>Train Name</td>
            <td>Date</td>
            <td>Source</td>
            <td>Destination</td>
            <td>Type</td>
          </tr>
          </thead>
          <tbody>
          {(()=> {
            let index = 0;
            return cancelledTrains[this.state.selected].map(train=> {
              return (
                <tr key={Date.now() + Math.random()}>
                  <td>{++index}</td>
                  <td>{train.trainNo}</td>
                  <td>{train.trainName}</td>
                  <td>{train.startDate}</td>
                  <td>{train.trainSrc}</td>
                  <td>{train.trainDstn}</td>
                  <td>{train.trainType}</td>
                </tr>
              );
            });
          })()}
          </tbody>
        </table>
      </div>
    );
  }
}
