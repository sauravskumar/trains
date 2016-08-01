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
    stationList: PropTypes.array
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  search = () => {
    // console.log(this.refs.stationCodeInput.getWrappedInstance().refs.searchInput.value);
    let trainInfo = this.refs.stationCodeInput.getWrappedInstance().refs.searchInput.value;
    trainInfo = trainInfo.replace(/ /g, '-').replace(/-+/, '-' );
    const path = `/trains/station-info/${trainInfo}`;
    this.context.router.push(path);
  };
  render() {
    const {stationList} = this.props;
    return (
      <div>
        <div className={ 'form-inline text-center ' + style.trainsBetweenForm }>
          <SearchInput ref="stationCodeInput" placeholder={'Station Name / Code'} list={ stationList } type="station"/>
          <button className="btn btn-primary" onClick={this.search}>Search</button>
        </div>
      </div>
    );
  }
}
