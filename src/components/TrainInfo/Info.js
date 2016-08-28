/**
 * Created by saurav on 28/8/16.
 */
import React from 'react';
import style from './TrainInfoForm.scss';
export default ({keys, selectedStatus, train}) => { // eslint-disable-line
  const startTime = train.all_data[10];
  const arrivalTime = train.all_data[11];
  let duration = train.all_data[12].split('.');
  duration = duration[0] + ' hours ' + (duration[1] === '00' ? '' : duration[1] + ' minutes');
  const day = train.all_data[34] === '1' ? 'same' : train.all_data[34];
  const pantry = train.all_data[34];
  let daysString = train.days;
  if (!daysString.includes('')) {
    daysString = 'all days';
  } else {
    daysString[0] = daysString[0] ? 'sunday' : '';
    daysString[1] = daysString[1] ? 'monday' : '';
    daysString[2] = daysString[2] ? 'tuesday' : '';
    daysString[3] = daysString[3] ? 'wednesday' : '';
    daysString[4] = daysString[4] ? 'thursday' : '';
    daysString[5] = daysString[5] ? 'friday' : '';
    daysString[6] = daysString[6] ? 'saturday' : '';
    daysString = daysString ? daysString.filter(Boolean).join(', ') + ' only' : [];
  }
  let impStations = train.route.map(obj=> {
    if (obj.station_name.toLowerCase().includes(' jn')) {
      return (obj.station_name);
    }
  });
  impStations.shift();
  impStations.pop();
  impStations = impStations.filter(Boolean);
  return (
    <div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>{train.code} {train.name} Train journey information</h4>
        </div>
        <div className="panel-body" style={{padding: '15px'}}>
          {train.code} {train.name} is a morning trains which starts from&nbsp;
          {train.all_data[2]}&nbsp;
          <b>{train.all_data[3]}</b> at {startTime} and reaches its destination {train.all_data[4]}&nbsp;
          <b>{train.all_data[5]}</b> by {arrivalTime}, {duration} later one the {day} day. <br/>
          This train {pantry ? ' does' : 'does not' } have a pantry car so {pantry ?
          'you can get food on the train itself' : 'you may want to carry your own food'}. Total
          distance travelled by the trains is {train.all_data[39]} km. and it runs
          on {daysString.replace(/,(\s+)?$/, ' and')}. {impStations.length ?
          <span>Important stations in this route are&nbsp;
            {impStations.join(', ').replace(/ Jn/g, '').replace(/,(\s+)?$/, ' and')}.</span> : ''}
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
              <i className={'material-icons '}>&#xE55B;</i>&nbsp;
              Distance: {train.all_data[39]} km.
            </div>
            <div className="col-xs-12 col-md-6">
              <i className={'material-icons '}>&#xE55B;</i>&nbsp;
              Distance: {train.all_data[39]} km.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
