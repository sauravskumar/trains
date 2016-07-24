/**
 * Created by saurav on 12/7/16.
 */
import React, {Component} from 'react';
import style from './Footer.scss';
import {Link} from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <footer className={style.footer}>
        <div className="container">
          <ul>
            <li>
              <a href={'/coupons/'}>Coupons</a>
            </li>
            <li>
              <a href={'/about/'}>About</a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}
