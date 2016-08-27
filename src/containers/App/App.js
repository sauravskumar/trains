import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {IndexLink} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import {Footer, Drawer} from 'components';
import config from '../../config';
import ga from 'react-ga';
import styles from './App.scss';
// import {push} from 'react-router-redux';
// import {isLoaded as isInfoLoaded, load as loadInfo} from 'redux/modules/info';
// import {isLoaded as isAuthLoaded, load as loadAuth, logout} from 'redux/modules/auth';
// import {loadFooter} from 'redux/modules/search';
// import {asyncConnect} from 'redux-connect';

@connect(state => ({loading: state.search.loading}))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    footer: PropTypes.footer,
    loading: PropTypes.bool,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }),
    // logout: PropTypes.func.isRequired,
    // pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  // componentWillReceiveProps(nextProps) {
  //   if (!this.props.user && nextProps.user) {
  //     // login
  //     this.props.pushState('/loginSuccess');
  //   } else if (this.props.user && !nextProps.user) {
  //     // logout
  //     this.props.pushState('/');
  //   }
  // }

  // handleLogout = (event) => {
  //   event.preventDefault();
  //   this.props.logout();
  // };

  componentDidMount = () => {
    ga.initialize('UA-81811986-1', { debug: false });
    ga.pageview(this.props.location.pathname);
  };

  componentWillUpdate = (nextProps) => {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      ga.pageview(nextProps.location.pathname);
    }
  };

  toggleNav = () => {
    this.refs.drawer.getWrappedInstance().closeDrawer();
  };

  render() {
    const {user, loading} = this.props;
    return (
      <div className={styles.app}>
        <Drawer ref="drawer"/>
        <Helmet {...config.app.head}/>
        <div className={loading ? styles.loader : styles.hidden}>{loading}</div>
        <Navbar fixedTop>
          <Navbar.Header>
            <i className="material-icons md-dark hidden-sm hidden-md hidden-lg" style={{float: 'left', marginRight: '10px'}} onClick={this.toggleNav}>menu</i>
            <Navbar.Brand>
              <IndexLink to="/trains/" title="Atmed Trains Home">
                <nobr>
                  <img src={'https://res.cloudinary.com/atmed/image/upload//c_scale,h_20,q_100/atmed_logo.png'}
                           alt="atmed_logo" style={{maxHeight: '20px'}}/><span>&nbsp;Trains</span></nobr>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav navbar>
              {user && <LinkContainer to="/chat">
                <NavItem eventKey={1}>Chat</NavItem>
              </LinkContainer>}

              {/* <LinkContainer to="/widgets">
               <NavItem eventKey={2}>Widgets</NavItem>
               </LinkContainer>
               <LinkContainer to="/survey">
               <NavItem eventKey={3}>Survey</NavItem>
               </LinkContainer> */}
              <LinkContainer to="/trains/pnr-status">
                <NavItem eventKey={3} title="PNR Status">PNR Status</NavItem>
              </LinkContainer>
              <LinkContainer to="/trains/running-status-route">
                <NavItem eventKey={3} title="Train Running status and Route">Train Live Status & Route</NavItem>
              </LinkContainer>
              <LinkContainer to="/trains/cancelled">
                <NavItem eventKey={3} title="Cancelled trains">Cancelled Trains</NavItem>
              </LinkContainer>
              <LinkContainer to="/trains/station" >
                <NavItem eventKey={3} title="Station Information">Station Info</NavItem>
              </LinkContainer>
              {/* {!user &&
               <LinkContainer to="/login">
               <NavItem eventKey={5}>Login</NavItem>
               </LinkContainer>}
               {user &&
               <LinkContainer to="/logout">
               <NavItem eventKey={6} className="logout-link" onClick={this.handleLogout}>
               Logout
               </NavItem>
               </LinkContainer>} */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container appContent">
          <div className={styles.appContent}>
            {this.props.children}
          </div>
          <div className="push"></div>
        </div>
        <Footer/>
      </div>
    );
  }
}
