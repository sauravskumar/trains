/**
 * Created by saurav on 29/8/16.
 */
import React from 'react';

export default ({trainBetweenList})=> {
  const getDays = (daysArr) => {
    daysArr[0] = daysArr[0] ? 'sunday' : '';
    daysArr[1] = daysArr[1] ? 'monday' : '';
    daysArr[2] = daysArr[2] ? 'tuesday' : '';
    daysArr[3] = daysArr[3] ? 'wednesday' : '';
    daysArr[4] = daysArr[4] ? 'thursday' : '';
    daysArr[5] = daysArr[5] ? 'friday' : '';
    daysArr[6] = daysArr[6] ? 'saturday' : '';
    return daysArr ? daysArr.filter(Boolean) : [];
  };
  return (
    <div className="col-xs-12">
      <div className="panel panel-default">
        <div className="panel-heading">
          Summary
        </div>
        <div className="panel-body">
          <ul>
            <li>There are {trainBetweenList.exactMatch.length} trains running directly
              from <b>{trainBetweenList.actual_src.code_name}</b> to <b>{trainBetweenList.actual_dest.code_name}</b>
            </li>
            <li>{trainBetweenList.json.length} trains are available from nearby stations</li>
            <li>Train number {trainBetweenList.bestTrain.train.train_code} -&nbsp;
              {trainBetweenList.bestTrain.train.train_name} is the fastest train which
              takes {trainBetweenList.bestTrain.duration}</li>
            <li>Distance between {trainBetweenList.actual_src.station_name}&nbsp;
              to {trainBetweenList.actual_dest.station_name} is approximately&nbsp;
              {trainBetweenList.exactMatch.length ? trainBetweenList.exactMatch[0].dest_route.distance.low :
                trainBetweenList.json[0].dest_route.distance.low}
              km
            </li>
            <li>Train {trainBetweenList.bestTrain.train.train_code} -&nbsp;
              {trainBetweenList.bestTrain.train.train_name} is
              available {trainBetweenList.bestTrain.train.days.includes('') ?
              'only on ' + getDays(trainBetweenList.bestTrain.train.days).join(', ') :
                'all days'} from {trainBetweenList.actual_src.code_name}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
