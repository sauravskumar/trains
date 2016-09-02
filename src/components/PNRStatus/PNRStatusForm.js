/**
 * Created by saurav on 11/7/16.
 */
import React, {Component, PropTypes} from 'react';
import {loadPnr} from 'redux/modules/search';
import {connect} from 'react-redux';
import style from './PNRStatusForm.scss';
import {bindActionCreators} from 'redux';
@connect(
  state => ({pnr: state.search.pnr}),
  dispatch => bindActionCreators({loadPnr}, dispatch)
)
export default class PNRStatusForm extends Component {
  static propTypes = {
    loadPnr: PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  loadPnr = () => {
    // console.log(this.refs.pnrInput.value, event);
    this.props.loadPnr(this.refs.pnrInput.value);
    this.context.router.push('/in/trains/pnr-status');
  };

  render() {
    return (
      <div className={'form-inline text-center ' + style.PNRStatusForm}>
        <h4 className="text-center">Check PNR Status</h4>
        <input className="form-control" ref="pnrInput" id="focusedInput" type="text"
               style={{margin: '0 auto', marginBottom: '10px'}}
               placeholder="Enter 10 dig. PNR Number"/>
        <button className="btn btn-primary" onClick={this.loadPnr}>Search</button>
      </div>
    );
  }
}
