/**
 * Created by saurav on 8/7/16.
 */
import React, {Component, PropTypes} from 'react';
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
    stationList: PropTypes.array,
    source: PropTypes.string,
    destination: PropTypes.string,
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  search = () => {
    let source = this.refs.sourceSt.getWrappedInstance().refs.searchInput.value;
    let dest = this.refs.destSt.getWrappedInstance().refs.searchInput.value;
    // let nearby = this.refs.nearby.value;
    // console.log(nearby);
    // const nearby = this.refs.nearby.checked;
    // console.log(nearby);
    source = source.replace(/ /g, '-').replace(/-+/, '-').toLowerCase().split('-');
    dest = dest.replace(/ /g, '-').replace(/-+/, '-').toLowerCase().split('-');
    let path = `/in/trains/${source[0]}-to-${dest[0]}`;
    source.shift();
    dest.shift();
    path += `-${source.join('-')}-to-${dest.join('-')}`;
    this.context.router.push(path);
  };

  render() {
    // require the logo image both from client and server
    const {stationList, source, destination} = this.props;
    return (
      <div style={{width: '100%'}}>
        <h4 className="text-center">Trains Between Station</h4>
        <div className={ 'form-inline text-center ' + style.trainsBetweenForm }>
          <SearchInput ref="sourceSt" placeholder={source ? source : 'Source: e.g. NDLS New...'}
                       list={ stationList }
                       type="station"/>
          <div
            style={{
              border: '1px solid #ddd',
              display: 'inline-block',
              borderRadius: '50%',
              textAlign: 'center',
              height: '50px',
              width: '50px',
              margin: '0 auto',
              position: 'relative',
            }}>
            <i className="material-icons"
               style={{margin: '0 auto', color: '#ddd', verticalAlign: 'middle', lineHeight: '50px'}}>&#xE571;</i>
          </div>
          <SearchInput ref="destSt" placeholder={destination ? destination : 'Destination: e.g. CSTM Mum...'}
                       list={ stationList }
                       type="station"/>
          <button className="btn btn-primary" onClick={this.search}>Search</button>
        </div>
      </div>
    );
  }
}
