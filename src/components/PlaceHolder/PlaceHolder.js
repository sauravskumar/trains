/**
 * Created by saurav on 13/7/16.
 */
import React, {PropTypes, Component} from 'react';
import style from './PlaceHolder.scss';
import {Link} from 'react-router';
import {connect} from 'react-redux';
@connect(
  state => ({defaultStation: state.app.defaultStation})
)
export default class PlaceHolder extends Component {
  static propTypes = {
    list: PropTypes.array,
    defaultStation: PropTypes.string
  };

  generateUrl = (source, destination) => {
    const src = source.split(' ');
    const dest = destination.split(' ');
    if (src[0].toLowerCase() === dest[0].toLowerCase()) {
      return {title: ``, url: ``};
    }
    return {
      title: `${dest.join(' ')}`,
      url: `/in/trains/${src[0]}-to-${dest[0]}-${src.slice(1, src.length).join('-')}-to-${dest.slice(1, dest.length).join('-')}`.toLowerCase()
    };
  };

  render() {
    const list = [
      {
        name: 'red_fort_new_delhi',
        title: 'Red Fort, New Delhi',
        subTitle: 'Monument · Fashion · Art · Capital · Night Life',
        color: '#F84007'
      },
      {
        name: 'taj_mahal_agra',
        title: 'Taj Mahal, Agra',
        subTitle: 'Shopping · Temples · Art · Monument',
        color: '#B4B6A4'
      },
      {
        name: 'mysore_palace_mysore',
        title: 'Mysore Palace, Mysore',
        subTitle: 'Palace · Yoga · Spiritual · Art · Tourism · Silk',
        color: '#C9BF13'
      },
      {
        name: 'kerela',
        title: 'Light House Beach, Kerela',
        subTitle: 'Night Life · Beach · Yaoga · Church · Water Sports',
        color: '#1F141C'
      },
      {
        name: 'rann_of_kutch_gujrat',
        title: 'Rann of Kutch, Gujrat',
        subTitle: 'Seaports · Ports · Trading · Museums · Religious · Shopping',
        color: '#95A0D8'
      },
      {
        name: 'city_palace_udaipur',
        title: 'City Palace, Udaipur',
        subTitle: 'Palace · Temples · Shopping · Yoga · Architecture',
        color: '#ADAA7D'
      },
    ];
    const {defaultStation} = this.props;
    return (
      <div className="panel panel-default">
        <div className="panel-heading" style={{background: '#FFFFFF', paddingBottom: '0'}}>
          <h5 className="text-center">Popular Destinations</h5>
        </div>
        <hr style={{color: '#4995FB', background: '#4995FB'}}/>
        <div className="panel-body" style={{padding: '0px', margin: '0px'}}>
          <div className="row text-center">
            <div className="col-xs-12">
              {[this.generateUrl(defaultStation, 'NDLS New Delhi'),
                this.generateUrl(defaultStation, 'HWH Howrah Jn'),
                this.generateUrl(defaultStation, 'CNB Kanpur Central Jn'),
                this.generateUrl(defaultStation, 'BZA Vijayawada Jn'),
                this.generateUrl(defaultStation, 'ALD Allahabad Jn'),
                this.generateUrl(defaultStation, 'ALD Allahabad Jn'),
                this.generateUrl(defaultStation, 'ET Itarsi Jn'),
                this.generateUrl(defaultStation, 'PNBE Patna Jn')
              ]
                .map((obj)=> {
                  if (obj.url && obj.title) {
                    return (<Link to={obj.url} className={style.placeholderLink}>{obj.title}</Link>);
                  }
                })}
            </div>
          </div>
          <br/>
          <div className="row" style={{maxWidth: '100%', margin: '0 auto'}}>
            {list.map(obj => {
              return (
                <div key={Date.now() + Math.random()} className={'col-xs-12 col-sm-4 ' + style.imgDiv}>
                  <div className={style.pimg}
                       style={{
                         backgroundImage: 'url(https://res.cloudinary.com/atmed/image/upload/trains/' +
                         obj.name + ')'
                       }}></div>
                  <div style={{height: '115px', width: '100%', background: obj.color}}>
                    <div style={{fontSize: '15px', lineHeight: '30px'}}><b>{obj.title}</b></div>
                    <div style={{fontSize: '13px', lineHeight: '17px'}}>{obj.subTitle}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
