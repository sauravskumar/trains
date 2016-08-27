/**
 * Created by saurav on 12/7/16.
 */
import React, {Component, PropTypes} from 'react';
import style from './Footer.scss';
import {Link} from 'react-router';
import {connect} from 'react-redux';

@connect(state => ({footer: state.search.footer}))
export default class Footer extends Component {
  static propTypes = {
    footer: PropTypes.object
  };

  render() {
    const {footer} = this.props;
    const about = ['Contact Us', 'About Trains', 'Privacy Policy'];
    return (
      <footer className={style.footer + ' footer' }>
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-md-3">
              <b>Quick Trains</b>
              <ul className={style.footerLinks}>
                {footer.second.map(obj=> {
                  return (<li key={Date.now() + Math.random()}><Link
                    to={'/trains/' + (`${footer.source_code}-to-${obj.station_code}-${footer.source_name}-to-${obj.station_name}`).toLowerCase().replace(/ /g, '-')}>{footer.source_name}&nbsp;
                    to {obj.station_name}</Link></li>);
                })}
              </ul>
            </div>
            <div className="col-xs-6 col-md-3">
              <b>Quick Trains</b>
              <ul className={style.footerLinks}>
                {footer.first.map(obj=> {
                  return (<li key={Date.now() + Math.random()}><Link
                    to={'/trains/' + (`${footer.dest_code}-to-${obj.station_code}-${footer.dest_name}-to-${obj.station_name}`).toLowerCase().replace(/ /g, '-')}>{footer.dest_name}&nbsp;
                    to {obj.station_name}</Link></li>);
                })}
              </ul>
            </div>
            <div className="col-xs-6 col-md-3">
              <b>More Info.</b>
              <ul className={style.footerLinks}>
                {about.map(obj=> {
                  return (
                    <li key={Date.now() + Math.random()}>
                      <Link to={'/trains/' + obj.toLowerCase().replace(/ /g, '-')}
                            rel="nofollow">{obj}</Link>
                    </li>);
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="container-fluid">
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
        </div>
      </footer>
    );
  }
}
