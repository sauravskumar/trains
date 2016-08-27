/**
 * Created by saurav on 13/7/16.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react'; // eslint-disable-line
import {fitBounds} from 'google-map-react/utils'; // eslint-disable-line
import style from './GoogleMaps.scss';

export default class GoogleMaps extends Component {
  static propTypes = {
    srcLat: PropTypes.number,
    srcLong: PropTypes.number,
    destLat: PropTypes.number,
    destLong: PropTypes.number,
    center: PropTypes.object,
    zoom: PropTypes.number,
    trainBetweenList: PropTypes.object,
  };
  state = {
    zoom: 9
  };
  componentDidMount = () => {
    this.resetZoom();
  };
  componentWillReceiveProps = () => {
    this.resetZoom();
  };
  shouldComponentUpdate = shouldPureComponentUpdate;
  resetZoom = () => {
    const width = ReactDOM.findDOMNode(this).offsetWidth;
    const height = ReactDOM.findDOMNode(this).offsetHeight;
    console.log(height, width);
    let north, south, east, west; // eslint-disable-line
    if (this.props.trainBetweenList.actual_src.latitude > this.props.trainBetweenList.actual_dest.latitude) {
      north = this.props.trainBetweenList.actual_src.latitude;
      south = this.props.trainBetweenList.actual_dest.latitude;
    } else {
      south = this.props.trainBetweenList.actual_src.latitude;
      north = this.props.trainBetweenList.actual_dest.latitude;
    }
    if (this.props.trainBetweenList.actual_src.longitude > this.props.trainBetweenList.actual_dest.longitude) {
      east = this.props.trainBetweenList.actual_src.longitude;
      west = this.props.trainBetweenList.actual_dest.longitude;
    } else {
      west = this.props.trainBetweenList.actual_src.longitude;
      east = this.props.trainBetweenList.actual_dest.longitude;
    }
    const bounds = {
      nw: {
        lat: north,
        lng: west
      },
      se: {
        lat: south,
        lng: east
      }
    };
    console.log(bounds);
    const {zoom} = fitBounds(bounds, {width: width, height: height});
    // console.log('zoom -> ' + zoom);
    this.setState({zoom: zoom});
    console.log(this.state);
  };

  render() {
    const {trainBetweenList} = this.props;
    const defaultCenter = (trainBetweenList) => { // eslint-disable-line no-shadow
      if (trainBetweenList) {
        console.log('defaultCenter');
        return {
          lat: (trainBetweenList.actual_src.latitude + trainBetweenList.actual_dest.latitude) / 2,
          lng: (trainBetweenList.actual_src.longitude + trainBetweenList.actual_dest.longitude) / 2
        };
      }
      return this.props.center;
    };
    // let pointers = new Set();
    // trainBetweenList.json.map(journey=>{
    //   pointers.add(journey);
    // });
    return (
      <GoogleMap ref="googleMap" style={{height: '100%', maxWidth: '100%'}}
                 bootstrapURLKeys={{
                   key: 'AIzaSyA0JdItcaokWQweZinAufHpSaJJYWvB3-w',
                 }}
                 center={defaultCenter(trainBetweenList)}
                 zoom={this.state.zoom}>
        <div className={style.exactMatch} lat={trainBetweenList.actual_src.latitude}
             lng={trainBetweenList.actual_src.longitude}>{trainBetweenList.actual_src.code_name}</div>
        <div className={style.exactMatch} lat={trainBetweenList.actual_dest.latitude}
             lng={trainBetweenList.actual_dest.longitude}>{trainBetweenList.actual_dest.code_name}</div>
        {trainBetweenList.json.map(journey=> {
          return (
              <div className={style.nearby} key={Date.now() + Math.random()} lat={journey.src.latitude}
                   lng={journey.src.longitude}>{journey.src.station_code}</div>
          );
        })}
        {trainBetweenList.json.map(journey=> {
          return (
              <div className={style.nearby} key={Date.now() + Math.random()} lat={journey.dest.latitude}
                   lng={journey.dest.longitude}>{journey.dest.station_code}</div>
          );
        })}
      </GoogleMap>
    );
  }
}
