/**
 * Created by saurav on 29/8/16.
 */
import React from 'react';
import style from './TrainsBetween.scss';
export default ({trainBetweenList})=> {
  const getDays = (daysArr) => { // eslint-disable-line
    daysArr[0] = daysArr[0] ? 'sunday' : '';
    daysArr[1] = daysArr[1] ? 'monday' : '';
    daysArr[2] = daysArr[2] ? 'tuesday' : '';
    daysArr[3] = daysArr[3] ? 'wednesday' : '';
    daysArr[4] = daysArr[4] ? 'thursday' : '';
    daysArr[5] = daysArr[5] ? 'friday' : '';
    daysArr[6] = daysArr[6] ? 'saturday' : '';
    return daysArr ? daysArr.filter(Boolean) : [];
  };
  const daysToString = (daysArr) => {
    let daysString = daysArr;
    // console.log(daysString);
    if (!daysString.includes('')) {
      daysString = ' on all days';
      return daysString;
    }
    daysString[0] = daysString[0] ? 'sunday' : '';
    daysString[1] = daysString[1] ? 'monday' : '';
    daysString[2] = daysString[2] ? 'tuesday' : '';
    daysString[3] = daysString[3] ? 'wednesday' : '';
    daysString[4] = daysString[4] ? 'thursday' : '';
    daysString[5] = daysString[5] ? 'friday' : '';
    daysString[6] = daysString[6] ? 'saturday' : '';
    daysString = daysString ? daysString.filter(Boolean).join(', ') : [];
    // daysString = daysString.length > 0 ? ('only on ' + daysString) : ' on none of the days.';
    return 'only on ' + daysString;
  };
  let impStations = trainBetweenList.bestRoute.map(obj=> { //  eslint-disable-line
    if (obj.station_name.toLowerCase().includes(' jn')) {
      return (obj.station_name);
    }
  });
  impStations.shift();
  impStations.pop();
  impStations = impStations.filter(Boolean);
  impStations.splice(5);
  return (
    <div className="col-xs-12">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>{trainBetweenList.actual_src.station_name} to {trainBetweenList.actual_dest.station_name} train&nbsp;
            journey information</h4>
        </div>
        <div className="panel-body" style={{margin: '15px'}}>
          Distance by train from {trainBetweenList.actual_src.station_name} to&nbsp;
          {trainBetweenList.actual_dest.station_name} is close to {trainBetweenList.avgDistance} km and&nbsp;
          {trainBetweenList.exactMatch.length > 0 ?
          trainBetweenList.exactMatch[0].train.train_code + ' - ' +
          trainBetweenList.exactMatch[0].train.train_name :
          trainBetweenList.json[0].train.train_code + ' - ' +
          trainBetweenList.json[0].train.train_name} is the first&nbsp;
          direct train available that runs from {trainBetweenList.actual_src.station_code}&nbsp;
          to {trainBetweenList.actual_dest.station_code}&nbsp;
          <br/>
          {trainBetweenList.exactMatch.length > 0 ?
          trainBetweenList.exactMatch[trainBetweenList.exactMatch.length - 1].train.train_code
          + ' - ' + trainBetweenList.exactMatch[trainBetweenList.exactMatch.length - 1].train.train_name :
          trainBetweenList.json[trainBetweenList.json.length - 1].train.train_code
          + ' - ' + trainBetweenList.json[trainBetweenList.json.length - 1].train.train_name}&nbsp;
          is the last train available for this route.
          <br/>
          The are {trainBetweenList.exactMatch.length} direct trains and {trainBetweenList.json.length}&nbsp;
          trains available from close by stations.
          <br/>
          {trainBetweenList.exactMatch.length === 0 ? '' :
          ' Direct trains are available ' + daysToString(trainBetweenList.days)}.
          <br/>
          {impStations.length ?
            <span> Important stations in this route are&nbsp;
              {impStations.join(', ').replace(/ Jn/g, '').replace(/,(\s+)?$/, ' and')}.</span> : ''}
          <br/>
          The fastest train in this route is {trainBetweenList.bestTrain.train.train_code}
          - {trainBetweenList.bestTrain.train.train_name}&nbsp; is of
          type {trainBetweenList.bestTrain.train.all_data[50].replace('&', 'and')} with a travel time of
          just { trainBetweenList.bestTrain.duration}
          <br/>
          Station {trainBetweenList.actual_src.station_name} ({trainBetweenList.actual_src.station_code})&nbsp;
          lies under {trainBetweenList.actual_src.division} division and the station&nbsp;
          {trainBetweenList.actual_dest.station_name} ({trainBetweenList.actual_dest.station_code})&nbsp;
          is under {trainBetweenList.actual_dest.division} division of Indian railways.
          <br/>
          <hr/>
          {/* <div className="row">
           <div className="col-xs-8">
           <h4>Are there any direct trains?</h4>
           Yes, there {trainBetweenList.exactMatch.length < 2 ? 'is only 1 train'
           : 'are ' + trainBetweenList.exactMatch.length + ' trains'} that run directly from&nbsp;
           {trainBetweenList.actual_src.station_name} to&nbsp;
           {trainBetweenList.actual_dest.station_name}.
           </div>
           <div className="col-xs-4">
           <div className={'text-center text-capitalize ' + style.box}>
           <abbr>{trainBetweenList.exactMatch.length ? trainBetweenList.exactMatch.length :
           trainBetweenList.exactMatch.length + ' trains'}</abbr><br/>
           trains
           </div>
           </div>
           </div>
           <hr/> */}
          <div className="row">
            <div className="col-xs-8">
              <h4>How long does it take?</h4>
              Average journey duration for this trip is {trainBetweenList.avgDuration} The journey&nbsp;
              time may vary from estimated average.
            </div>
            <div className="col-xs-4">
              <div className={'text-center text-capitalize ' + style.box}>
                Avg. Duration <br/>
                <abbr>
                  {trainBetweenList.avgDuration}</abbr>
              </div>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-xs-8">
              <h4>What is the journey distance?</h4>
              The distance between {trainBetweenList.actual_src.station_name} and&nbsp;
              {trainBetweenList.actual_dest.station_name} by train is close to {trainBetweenList.avgDistance} km.
            </div>
            <div className="col-xs-4">
              <div className={'text-center text-capitalize ' + style.box}>
                Distance <br/>
                <abbr>
                  {trainBetweenList.avgDistance} km.</abbr>
              </div>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-xs-8">
              <h4>Which is the best train?</h4>
              {trainBetweenList.bestTrain.train.train_code + ' ' + trainBetweenList.bestTrain.train.train_name} is
              the&nbsp;
              best train for this trip which takes {trainBetweenList.bestTrain.duration} only. It departs from&nbsp;
              {trainBetweenList.bestTrain.src.station_name}&nbsp;
              at {trainBetweenList.bestTrain.src_route.departure_time.toFixed(2).replace('.', ':')}&nbsp;
              and reaches {trainBetweenList.bestTrain.dest.station_name} by&nbsp;
              {trainBetweenList.bestTrain.dest_route.arrival_time.toFixed(2).replace('.', ':')}.
            </div>
            <div className="col-xs-4">
              <div className={'text-center text-capitalize ' + style.box}>
                <abbr>
                  {trainBetweenList.bestTrain.train.train_code}
                  <br/>{trainBetweenList.bestTrain.train.train_name}
                </abbr>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <i className="material-icons">&#xE571;</i>Train Types: {trainBetweenList.trainTypes.join(', ')}
            </div>
            <div className="col-xs-12 col-md-6">
              <i className="material-icons">&#xE8D4;</i> Direct
              Trains: {trainBetweenList.exactMatch.length === 1 ?
            trainBetweenList.exactMatch.length + ' Train' : trainBetweenList.exactMatch.length + ' Trains'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
