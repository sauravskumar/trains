/**
 * Created by saurav on 8/7/16.
 */
import React, {Component, PropTypes} from 'react';
// import { Link } from 'react-router';
// import { CounterButton, GithubButton } from 'components';
// import config from '../../config';
import style from './SearchInput.scss';
// import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {trainComp, stationComp} from 'redux/modules/search';

@connect(
  null,
  dispatch => ( bindActionCreators({trainComp, stationComp}, dispatch)),
  null,
  {withRef: true}
)
export default class SearchInput extends Component {
  static propTypes = {
    list: PropTypes.array,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    trainComp: PropTypes.func,
    stationComp: PropTypes.func
  };
  state = {
    show: false
  };
  setValueofInput = (event) => {
    // console.log(event.currentTarget.innerText);
    this.refs.searchInput.value = event.currentTarget.innerText;
  };
  showResult = () => {
    setTimeout(()=> {
      this.setState({show: true});
    }, 300);
  };
  hideResult = () => {
    setTimeout(()=> {
      this.setState({show: false});
    }, 300);
  };
  doSearch = (event) => {
    // console.log(event.target.value);
    if (this.props.type === 'station') {
      this.props.stationComp(event.target.value);
    } else {
      this.props.trainComp(event.target.value);
    }
  };

  render() {
    // require the logo image both from client and server
    const {placeholder, list} = this.props;
    const {show} = this.state;
    return (
      <div className="form-group">
        <input className="form-control" id="focusedInput" type="text" ref="searchInput"
               placeholder={placeholder} onFocus={this.showResult} onKeyUp={this.doSearch}
               onBlur={() => {
                 this.hideResult();
               }} style={{margin: '0 auto'}}/>
        <ul className={show ? style.searchList + ' ' : style.hidden}
            style={{textAlign: 'left'}}>
          {list.map(obj => {
            return (
              <li className={style.searchResult} key={Date.now() + Math.random()}
                  onClick={this.setValueofInput} style={{paddingLeft: '10px'}}>
                <span style={{color: '#aaa'}}>{obj.code_name.split(/ (.+)?/)[0]}</span> <span>{obj.code_name.split(/ (.+)?/)[1]}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
