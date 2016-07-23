/**
 * Created by saurav on 13/7/16.
 */
import React, {PropTypes, Component} from 'react';
import style from './PlaceHolder.scss';

export default class PlaceHolder extends Component {
  static propTypes = {
    list: PropTypes.array
  }

  render() {
    const list = [
      {name: 'red_fort_new_delhi', title: 'Red Fort, New Delhi', subTitle: '', color: '#F84007'},
      {name: 'taj_mahal_agra', title: 'Taj Mahal, Agra', subTitle: 'Shopping · Temples · Art', color: '#B4B6A4'},
      {name: 'mysore_palace_mysore', title: 'Mysore Palace, Mysore', subTitle: '', color: '#C9BF13'},
      {name: 'kerela', title: 'Light House Beach, Kerela', subTitle: '', color: '#1F141C'},
      {name: 'rann_of_kutch_gujrat', title: 'Rann of Kutch, Gujrat', subTitle: '', color: '#95A0D8'},
      {name: 'city_palace_udaipur', title: 'City Palace, Udaipur', subTitle: '', color: '#ADAA7D'},
    ];
    return (
      <div className="panel panel-default">
        <div className="panel-heading" style={{background: '#FFFFFF'}}>
          <h5 className="text-center">Popular Destinations</h5>
        </div>
        <div className="panel-body" style={{padding: '0px', margin: '0px'}}>
          <div className="row" style={{maxWidth: '100%', margin: '0 auto'}}>
            {list.map(obj => {
              return (
                <div key={Date.now() + Math.random()} className={'col-xs-12 col-sm-4 ' + style.imgDiv}>
                  <div className={style.pimg}
                       style={{backgroundImage: 'url(/trains-images/placeholder/' + obj.name + '.jpg)'}}></div>
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