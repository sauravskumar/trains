/**
 * Created by saurav on 8/7/16.
 */
import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import { CounterButton, GithubButton } from 'components';
// import config from '../../config';
import style from './TrainBetweenForm.scss';
import {connect} from 'react-redux';
import SearchInput from './../SearchInput/SearchInput';

@connect(
  state => ({stationList: state.search.stationList})
)
export default class TrainBetweenForm extends Component {
  static propTypes = {
    stationList: PropTypes.array
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  search = () => {
    // console.log(this.refs.sourceSt.getWrappedInstance().refs.searchInput.value);
    // console.log(this.refs.destSt.getWrappedInstance().refs.searchInput.value);
    let source = this.refs.sourceSt.getWrappedInstance().refs.searchInput.value;
    let dest = this.refs.destSt.getWrappedInstance().refs.searchInput.value;
    const nearby = this.refs.nearby.checked;
    console.log(nearby);
    source = source.replace(/ /g, '-').replace(/-+/, '-' ).split('-');
    dest = dest.replace(/ /g, '-').replace(/-+/, '-' ).split('-');
    let path = `/trains/between/${source[0]}-to-${dest[0]}`;
    source.shift();
    dest.shift();
    path += `-${source.join('-')}-to-${dest.join('-')}`;
    this.context.router.push(path);
  };
  render() {
    // require the logo image both from client and server
    const {stationList} = this.props;
    return (
      <div style={{width: '100%'}}>
        <div className={ 'form-inline text-center ' + style.trainsBetweenForm }>
          <SearchInput ref="sourceSt" placeholder={'Source Station'} list={ stationList } type="station"/>
          <SearchInput ref="destSt"placeholder={'Dest. Station'} list={ stationList } type="station"/>
          <input type="checkbox" ref="nearby" title="Nearby Stations" defaultChecked/>
          <button className="btn btn-primary" onClick={this.search}>Search</button>
        </div>
      </div>
    );
  }
}
