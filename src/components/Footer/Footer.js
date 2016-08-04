/**
 * Created by saurav on 12/7/16.
 */
import React, {Component} from 'react';
import style from './Footer.scss';
// import {Link} from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <footer className={style.footer + ' footer' }>
        <div className="container">
          <ul>
            <li>
              <a href={'/coupons/'} title="Atmed Coupons" rel="nofollow">Coupons</a>
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
