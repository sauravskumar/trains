/**
 * Created by saurav on 8/7/16.
 */
import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import { CounterButton, GithubButton } from 'components';
// import config from '../../config';
import style from './StationInfoForm.scss';
import {connect} from 'react-redux';
import SearchInput from './../SearchInput/SearchInput';

@connect(
  state => ({stationList: state.search.stationList})
)
export default class StationInfoForm extends Component {
  static propTypes = {
    stationList: PropTypes.array,
    placeholder: PropTypes.string
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  search = () => {
    // console.log(this.refs.stationCodeInput.getWrappedInstance().refs.searchInput.value);
    let station = this.refs.stationCodeInput.getWrappedInstance().refs.searchInput.value;
    station = station.replace(/ /g, '-').toLowerCase().replace(/-+/, '-' );
    station = station.split('-');
    let name = station.splice(1);
    const code = station[0];
    name = name.join('-');
    const path = `/trains/station/${name}-${code}`;
    this.context.router.push(path);
  };
  render() {
    const {stationList, placeholder} = this.props;
    return (
      <div>
        <h4 className="text-center">Station information</h4>
        <div className={ 'form-inline text-center ' + style.trainsBetweenForm }>
          <SearchInput ref="stationCodeInput" placeholder={placeholder ? placeholder : 'Station Name / Code'} list={ stationList } type="station"/>
          <button className="btn btn-primary" onClick={this.search}>Search</button>
        </div>
      </div>
    );
  }
}
