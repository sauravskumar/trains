/**
 * Created by saurav on 13/7/16.
 */
import React, {Component, PropTypes} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap, {fitBounds} from 'google-map-react'; // eslint-disable-line
import style from './GoogleMaps.scss';

export default class GoogleMaps extends Component {
  static propTypes = {
    srcLat: PropTypes.number,
    srcLong: PropTypes.number,
    destLat: PropTypes.number,
    destLong: PropTypes.number,
    center: PropTypes.object,
    zoom: PropTypes.number,
    trainBetweenList: PropTypes.array,
  };
  static defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 9,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {trainBetweenList} = this.props;
    const defaultCenter = (trainBetweenList) => { // eslint-disable-line no-shadow
      if (trainBetweenList) {
        console.log('defaultCenter');
        // return {
        //   lat: (trainBetweenList.actual_src.latitude + trainBetweenList.actual_dest.latitude) / 2,
        //   lng: (trainBetweenList.actual_dest.longitude + trainBetweenList.actual_dest.longitude) / 2
        // };
        return {
          lat: (trainBetweenList.actual_src.latitude),
          lng: (trainBetweenList.actual_src.longitude)
        };
      }
      return this.props.center;
    };
    return (
      <GoogleMap style={{height: '100%'}}
                 bootstrapURLKeys={{
                   key: 'AIzaSyA0JdItcaokWQweZinAufHpSaJJYWvB3-w',
                 }}
                 defaultCenter={defaultCenter(trainBetweenList)}
                 defaultZoom={this.props.zoom}>
        <div className={style.exactMatch} lat={trainBetweenList.actual_src.latitude}
             lng={trainBetweenList.actual_dest.longitude}>{trainBetweenList.actual_src.code_name}</div>
        <div className={style.exactMatch} lat={trainBetweenList.actual_dest.latitude}
             lng={trainBetweenList.actual_dest.longitude}>{trainBetweenList.actual_dest.code_name}</div>
      </GoogleMap>
    );
  }
}
