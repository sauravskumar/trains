/**
 * Created by saurav on 27/8/16.
 */
import React from 'react';
import style from './TrainInfo.scss';
export default ({keys, selectedStatus, train}) => {
  return (
    <div className="panel panel-default">
      <div className="panel-body">
        {keys > 0 ? ((selected)=> {
          let index = -1;
          return train.route.map(route=> {
            index++;
            return (
              <div className={'row ' + style.mobileTrainCard}>
                <div className={'col-xs-1 ' + style.pos}>{route.position}</div>
                <div className="col-xs-5">
                  {route.station_name} - {route.station_code}<br/>
                  Day: {route.day}, Dist: {route.distance} km
                </div>
                <div className="col-xs-6">
                  <div className="row">
                    <div className="col-xs-4">
                      <div>{route.arrival_time.toFixed(2)}</div>
                      <div>{route.departure_time.toFixed(2)}</div>
                    </div>
                    <div className="col-xs-4">
                      <div>{(()=> {
                        return selected.stations[index] ? (()=> {
                          if (index === 0) {
                            return <span style={{color: 'green'}}>Start St.</span>;
                          }
                          if (selected.stations[index].updWaitngArr) {
                            return <span style={{color: '#aaa'}}>No update</span>;
                          }
                          if (selected.stations[index].arr || selected.stations[index].delayDep) {
                            return (selected.stations[index].delayArr ?
                              <span style={{color: 'red'}}>{selected.stations[index].delayArr} min.</span> :
                              <span style={{color: 'green'}}>On Time</span>);
                          }
                          return <span style={{color: '#aaa'}}>Not Arrived</span>;
                        })() : 'Not Arrived';
                      })()}</div>
                      <div>{(()=> {
                        return selected.stations[index] ? (()=> {
                          if (selected.stations[index].updWaitngDep) {
                            return <span style={{color: '#aaa'}}>No update</span>;
                          }
                          if (selected.stations[index].dep || selected.stations[index].delayDep) {
                            return (
                              selected.stations[index].delayDep ?
                                <span style={{color: 'red'}}>{selected.stations[index].delayDep} min.</span> :
                                <span style={{color: 'green'}}>On Time</span>);
                          }
                          return <span style={{color: '#aaa'}}>Not Arrived</span>;
                        })() : 'Not Arrived';
                      })()}</div>
                    </div>
                    <div className="col-xs-4">
                      <div>{selected.stations[index] ? selected.stations[index].actArr : 'No Data' }</div>
                      <div>{selected.stations[index] ? selected.stations[index].actDep : 'No Data'}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          });
        })(selectedStatus) : (()=> {
          return train.route.map(route=> {
            return (
              <div className={'row ' + style.mobileTrainCard}>
                <div className={'col-xs-1 ' + style.pos}>{route.position}</div>
                <div className="col-xs-5">
                  {route.station_name} - {route.station_code}<br/>
                  Day: {route.day}, Dist: {route.distance} km
                </div>
                <div className="col-xs-6">
                  <div className="row">
                    <div className="col-xs-4">
                      <div>{route.arrival_time.toFixed(2)}</div>
                      <div>{route.departure_time.toFixed(2)}</div>
                    </div>
                    <div className="col-xs-4"></div>
                    <div className="col-xs-4"></div>
                  </div>
                </div>
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};
