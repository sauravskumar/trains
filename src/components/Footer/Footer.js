/**
 * Created by saurav on 12/7/16.
 */
import React, {Component} from 'react';
import style from './Footer.scss';
import {Link} from 'react-router';

export default class Footer extends Component {
  render() {
    const stations = ['CSTM', 'CSTM', 'CSTM'];
    return (
      <footer className={style.footer + ' footer' }>
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-md-3">
              <b>Important Stations</b>
              <ul>
                {stations.map(obj=>{
                  return (<li><Link to={'/stations/'}>{obj}</Link></li>);
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className={'container ' + style.lastFooter}>
          <ul>
            <li>
              <a href={'/coupons/'} title="Atmed Coupons">Coupons</a>
            </li>
            <li>
              <a href="https://support.atmed.co/trains/about" title="About Trains" rel="nofollow">About Trains</a>
            </li>
            <li>
              Got to <a href="https://www.atmed.co" title="Atmed">Atmed.co</a>
            </li>
          </ul>
          ** Atmed Trains is in development. Credits to the respective artists will be updated soon.
        </div>
      </footer>
    );
  }
}
