import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {IndexLink} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
// import {isLoaded as isInfoLoaded, load as loadInfo} from 'redux/modules/info';
// import {isLoaded as isAuthLoaded, load as loadAuth, logout} from 'redux/modules/auth';
import {Footer, Drawer} from 'components';
// import {push} from 'react-router-redux';
import config from '../../config';
// import {asyncConnect} from 'redux-connect';
import styles from './App.scss';
// @asyncConnect([{
//   promise: ({store: {dispatch, getState}}) => {
//     const promises = [];
    //
    // if (!isInfoLoaded(getState())) {
    //   promises.push(dispatch(loadInfo()));
    // }
    // if (!isAuthLoaded(getState())) {
    //   promises.push(dispatch(loadAuth()));
    // }
//
//     return Promise.all(promises);
//   }
// }])
// @connect(
//   state => ({user: state.auth.user}),
//   {logout, pushState: push})
@connect(state => ({loading: state.search.loading}))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    loading: PropTypes.bool
    // logout: PropTypes.func.isRequired,
    // pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
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
              <IndexLink to="/trains/">
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
                <NavItem eventKey={3}>PNR Status</NavItem>
              </LinkContainer>
              <LinkContainer to="/trains/train-info">
                <NavItem eventKey={3}>Train Info</NavItem>
              </LinkContainer>
              <LinkContainer to="/trains/station">
                <NavItem eventKey={3}>Station Info</NavItem>
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
