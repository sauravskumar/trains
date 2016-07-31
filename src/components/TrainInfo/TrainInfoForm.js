/**
 * Created by saurav on 8/7/16.
 */
import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import { CounterButton, GithubButton } from 'components';
// import config from '../../config';
import style from './TrainInfoForm.scss';
import {connect} from 'react-redux';
import SearchInput from './../SearchInput/SearchInput';

@connect(
  state => ({trainList: state.search.trainList})
)
export default class TrainBetweenForm extends Component {
  static propTypes = {
    trainList: PropTypes.array
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  search = () => {
    console.log(this.refs.trainNoInput.getWrappedInstance().refs.searchInput.value);
    let trainInfo = this.refs.trainNoInput.getWrappedInstance().refs.searchInput.value;
    trainInfo = trainInfo.replace(/ /g, '-').replace(/-+/, '-' );
    const path = `/trains/train-info/${trainInfo}`;
    this.context.router.push(path);
  };
  render() {
    // require the logo image both from client and server
    const {trainList} = this.props;
    return (
      <div>
        <div className={ 'form-inline text-center ' + style.trainsBetweenForm }>
          <SearchInput ref="trainNoInput" placeholder={'Train Name / Number'} list={ trainList } type="train"/>
          <button className="btn btn-primary" onClick={this.search}>Search</button>
        </div>
      </div>
    );
  }
}
