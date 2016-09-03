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
    const about = [
      {title: 'Contact Us', url: 'https://atmed.co/contact'},
      {title: 'About', url: '/in/trains/about'},
      {title: 'Privacy Policy', url: 'https://atmed.co/privacy-policy'}
    ];
    const important = [{
      title: 'National Train Enquiry',
      url: 'http://enquiry.indianrail.gov.in/ntes/'
    }, {
      title: 'Indian Railway Gov.',
      url: 'http://www.indianrail.gov.in/'
    }, {
      title: 'IRCTC Ticket booking',
      url: 'https://www.irctc.co.in/eticketing/loginHome.jsf'
    }, {
      title: '',
      url: ''
    }];
    return (
      <footer className={style.footer + ' footer' }>
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-md-3">
              <b>Quick Trains</b>
              <ul className={style.footerLinks}>
                {footer.second.map(obj=> {
                  return (<li key={Date.now() + Math.random()}><Link
                    to={'/in/trains/' + (`${footer.source_code}-to-${obj.station_code}-${footer.source_name}-to-${obj.station_name}`).toLowerCase().replace(/ /g, '-')}>{footer.source_name}&nbsp;
                    to {obj.station_name}</Link></li>);
                })}
              </ul>
            </div>
            <div className="col-xs-6 col-md-3">
              <b>Quick Trains</b>
              <ul className={style.footerLinks}>
                {footer.first.map(obj=> {
                  return (<li key={Date.now() + Math.random()}><Link
                    to={'/in/trains/' + (`${footer.dest_code}-to-${obj.station_code}-${footer.dest_name}-to-${obj.station_name}`).toLowerCase().replace(/ /g, '-')}>{footer.dest_name}&nbsp;
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
                      <a href={obj.url.toLowerCase().replace(/ /g, '-')}
                            rel="nofollow">{obj.title}</a>
                    </li>);
                })}
              </ul>
            </div>
            <div className="col-xs-6 col-md-3">
              <b>Important Links</b>
              <ul className={style.footerLinks}>
                {important.map(obj=> {
                  return (
                    <li key={Date.now() + Math.random()}>
                      <a href={obj.url} target="_blank"
                         rel="nofollow">{obj.title}</a>
                    </li>);
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className={'container-fluid ' + style.lastFooter}>
          <div className={'container '}>
            <ul>
              <li>
                <a href="/in/coupons/" title="Atmed Coupons">Coupons</a>
              </li>
              <li>
                <Link to="https://www.atmed.co/in/trains/about" title="About Trains">About Trains</Link>
              </li>
              <li>
                <a href="https://www.atmed.co" title="Atmed">Atmed.co</a>
              </li>
            </ul>
            ** Atmed Trains is in development. Credits to the respective artists will be updated soon.
          </div>
        </div>
      </footer>
    );
  }
}
