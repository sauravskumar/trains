/**
 * Created by saurav on 28/8/16.
 */
import React, {PropTypes} from 'react';
import style from './TrainInfoForm.scss';
export default class Info extends React.Component {
  static propTypes = {
    train: PropTypes.object,
    lastClass: PropTypes.number,
    fare: PropTypes.array,
  };
  getGetOrdinal = (number) => {
    const string = ['th', 'st', 'nd', 'rd'];
    const remainder = number % 100;
    return (string[(remainder - 20) % 10] || string[remainder] || string[0]);
  };
  daysToString = (daysArr) => {
    let daysString = daysArr;
    if (!daysString.includes('')) {
      daysString = 'all days of week';
      return daysString;
    }
    daysString[0] = daysString[0] ? 'sunday' : '';
    daysString[1] = daysString[1] ? 'monday' : '';
    daysString[2] = daysString[2] ? 'tuesday' : '';
    daysString[3] = daysString[3] ? 'wednesday' : '';
    daysString[4] = daysString[4] ? 'thursday' : '';
    daysString[5] = daysString[5] ? 'friday' : '';
    daysString[6] = daysString[6] ? 'saturday' : '';
    daysString = daysString ? daysString.filter(Boolean).join(', ') + ' only' : [];
    return daysString;
  };
  render() {
    const {train, lastClass, fare} = this.props;
    const startTime = train.all_data[10];
    const arrivalTime = train.all_data[11];
    let duration = train.all_data[12].split('.');
    duration = duration[0] + ' hours ' + (duration[1] === '00' ? '' : duration[1] + ' minutes');
    const day = () => {
      if (train.all_data[34] === '1') {
        return 'same';
      }
      return (<span>{train.all_data[34]}<sup>{this.getGetOrdinal(train.all_data[34])}</sup></span>);
    };
    const pantry = parseInt(train.all_data[35], 10);
    let impStations = train.route.map(obj=> {
      if (obj.station_name.toLowerCase().includes(' jn')) {
        return (obj.station_name);
      }
    });
    impStations.shift();
    impStations.pop();
    impStations = impStations.filter(Boolean);
    impStations.splice(5);
    const insertAnd = (str1) => {
      let str = str1;
      const index = str.lastIndexOf(',');
      if (index !== -1) {
        str = str.substring(0, index) + ' and ' + str.substring(index + 1);
      }
      return str;
    };
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>{train.code} {train.name} Train journey information</h4>
          </div>
          <div className="panel-body" style={{padding: '15px', margin: '15px'}}>
            {train.code} {train.name} is a morning trains which starts from&nbsp;
            {train.all_data[2]}&nbsp;
            <b>{train.all_data[3]}</b> at {startTime}. It reaches its destination {train.all_data[4]}&nbsp;
            <b>{train.all_data[5]}</b> by {arrivalTime}. The journey takes an average duration of {duration}.&nbsp;
            The train arrives at the destination on the {day()} day itself. <br/>
            Total distance travelled by the trains is {train.all_data[39]} km. {impStations.length ?
            <span>Important stations in this route are&nbsp;
              {insertAnd(impStations.join(', ').replace(/ Jn/g, ''))}.</span> : ''}
            <hr/>
            <div>
              <h4>Does this train have a Pantry car?</h4>
              This train {pantry ? ' does' : 'does not' } have a pantry car so {pantry ?
              'you can get food on this train.' : 'you may want to carry your own food'}.
            </div>
            <hr/>
            <div>
              <h4>On what days is the train available?</h4>
              The train runs on {this.daysToString(new Array(train.days))}.
            </div>
            <hr/>
            <div>
              <h4>What is the minimum fare?</h4>
              Minimum fare for is Rs.{fare[lastClass].split(',')[0]} for type {train.classes[lastClass]}.
            </div>
          </div>
          <div className="panel-footer">
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <i className={'material-icons ' + (pantry ? style.available : 'nostyle')}>&#xEB49;</i>&nbsp;
                {pantry ? 'Pantry car: Available' : ' No pantry service'}
              </div>
              <div className="col-xs-12 col-md-6">
                <i className={'material-icons '}>&#xE192;</i>&nbsp;
                Duration: {duration}
              </div>
              <div className="col-xs-12 col-md-6">
                <i className={'material-icons '}>&#xE7F1;</i>&nbsp;
                Halts: {train.route.length}
              </div>
              <div className="col-xs-12 col-md-6">
                <i className={'material-icons '}>&#xE8C3;</i>&nbsp;
                Speed: {train.all_data[40]} km/hr.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
