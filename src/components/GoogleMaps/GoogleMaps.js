/**
 * Created by saurav on 13/7/16.
 */
import React, {Component, PropTypes} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';

export default class GoogleMaps extends Component {
  static propTypes = {
    srcLat: PropTypes.number,
    srcLong: PropTypes.number,
    destLat: PropTypes.number,
    destLong: PropTypes.number,
    center: PropTypes.object,
    zoom: PropTypes.number
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
    return (
      <GoogleMap style={{height: '100%'}}
                 bootstrapURLKeys={{
                   key: 'AIzaSyA0JdItcaokWQweZinAufHpSaJJYWvB3-w',
                 }}
                 defaultCenter={this.props.center}
                 defaultZoom={this.props.zoom}/>
    );
  }
}
