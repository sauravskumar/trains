/**
 * Created by saurav on 14/7/16.
 */
import React, {Component, PropTypes} from 'react';
import styles from './Drawer.scss';
import {Link} from 'react-router';
import {connect} from 'react-redux';

@connect(null, null, null, {withRef: true})
export default class Drawer extends Component {
  static propTypes = {
    categoryList: PropTypes.array
  };
  state = {
    showDrawer: false
  };
  closeDrawer = () => {
    this.setState({showDrawer: !this.state.showDrawer});
  };
  openDrawer = () => {
    this.setState({showDrawer: true});
  };

  render() {
    const menuList = [
      {_id: 'trains', name: 'Trains'},
      {_id: 'pnr-status', name: 'Pnr Status'},
      {_id: 'train', name: 'Train Info'},
      {_id: 'station', name: 'Station Info'},
      {_id: 'about', name: 'About'},
    ]; // eslint-disable-line no-shadow
    const {showDrawer} = this.state;
    return (
      <div className={showDrawer ? styles.backgroundBlur : ''} onClick={this.closeDrawer}>
        <div className={showDrawer ? styles.drawer : styles.hideDrawer} onClick={this.openDrawer}>
          <ul>
            {menuList.map((obj) => {
              return (
                <li className="text-capitalize" key={Date.now() + Math.random()} onClick={this.closeDrawer}>
                  <Link to={'/' + obj._id.toLowerCase().replace(' ', '-')}>{obj.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
