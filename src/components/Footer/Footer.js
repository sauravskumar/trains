/**
 * Created by saurav on 12/7/16.
 */
import React, {Component} from 'react';
import style from './Footer.scss';
// import {Link} from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <footer className={style.footer}>
        <div className="container">
          <ul>
            <li>
              <a href={'/coupons/'} title="Atmed Coupons">Coupons</a>
            </li>
            <li>
              <a href="https://support.atmed.co/trains/about" title="About Trains" rel="nofollow">About Trains</a>
            </li>
          </ul>
          ** Atmed Trains is in development. Credits to the respective artists will be updated soon.
        </div>
      </footer>
    );
  }
}
