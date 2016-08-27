/**
 * Created by saurav on 27/8/16.
 */
import React from 'react';
export default ({keys, selectedStatus, train}) => {
  return (
    <div className="panel panel-default" style={{fontSize: '13px'}}>
      <div className="panel-body" style={{padding: '0px', margin: '0px'}}>
        <table className="table table-striped table-hover">
          <thead>
          {keys > 0 ?
            <tr>
              <td>Pos.</td>
              <td>Station</td>
              <td>Sch. Arr.</td>
              <td>Sch. Dep.</td>
              <td>Day</td>
              <td>Dist.</td>
              <td>Arrival</td>
              <td>Delay</td>
              <td>Departure</td>
              <td>Delay</td>
            </tr> :
            <tr>
              <td>Pos.</td>
              <td>Station</td>
              <td>Sch. Arr.</td>
              <td>Sch. Dep.</td>
              <td>Day</td>
              <td>Dist.</td>
            </tr>}
          </thead>
          <tbody>
          {keys > 0 ? ((selected)=> {
            let index = -1;
            return train.route.map(route => {
              index++;
              return (
                <tr key={Date.now() + Math.random()}>
                  <td>{route.position}</td>
                  <td>{route.station_name} - {route.station_code}</td>
                  <td>{route.arrival_time.toFixed(2)}</td>
                  <td>{route.departure_time.toFixed(2)}</td>
                  <td>{route.day}</td>
                  <td>{route.distance} km</td>
                  <td>{selected.stations[index].actArr}</td>
                  <td>{(()=> {
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
                  })()}
                  </td>
                  <td>{selected.stations[index].actDep}</td>
                  <td>{((()=> {
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
                  }))()}</td>
                </tr>
              );
            });
          })(selectedStatus) : (()=> {
            return train.route.map(route => {
              return (
                <tr key={Date.now() + Math.random()}>
                  <td>{route.position}</td>
                  <td>{route.station_name} - {route.station_code}</td>
                  <td>{route.arrival_time.toFixed(2)}</td>
                  <td>{route.departure_time.toFixed(2)}</td>
                  <td>{route.day}</td>
                  <td>{route.distance} km</td>
                </tr>
              );
            });
          })()}
          </tbody>
        </table>
      </div>
    </div>
  );
};
