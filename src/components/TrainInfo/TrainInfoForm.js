/**
 * Created by saurav on 8/7/16.
 */
import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import { CounterButton, GithubButton } from 'components';
// import config from '../../config';
import style from './TrainInfoForm.scss';
import {connect} from 'react-redux';
import {SearchInput} from 'components';

@connect(
  state => ({trainList: state.search.trainList})
)
export default class TrainBetweenForm extends Component {
  static propTypes = {
    trainList: PropTypes.array,
    placeholder: PropTypes.string
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  search = () => {
    // console.log(this.refs.trainNoInput.getWrappedInstance().refs.searchInput.value);
    let trainInfo = this.refs.trainNoInput.getWrappedInstance().refs.searchInput.value;
    trainInfo = trainInfo.replace(/ /g, '-').toLowerCase().replace(/-+/, '-' );
    const path = `/in/trains/running-status-route/${trainInfo}`;
    this.context.router.push(path);
  };
  render() {
    // require the logo image both from client and server
    const {trainList, placeholder} = this.props;
    return (
      <div>
        <h4 className="text-center">Train live status & schedule</h4>
        <div className={ 'form-inline text-center ' + style.trainsBetweenForm }>
          <SearchInput ref="trainNoInput" placeholder={placeholder ? placeholder : 'Enter Train Name/No. E.g. 18111'} list={ trainList } type="train"/>
          <button className="btn btn-primary" onClick={this.search}>Search</button>
        </div>
      </div>
    );
  }
}
