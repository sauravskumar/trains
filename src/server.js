import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import {match} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {ReduxAsyncConnect, loadOnServer} from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import getRoutes from './routes';
import MobileDetect from 'mobile-detect';

const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});


app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, {target: targetUrl + '/ws'});
});

app.use('/in/trains/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

app.use('/in/trains/ws', (req, res) => {
  proxy.web(req, res, {target: targetUrl + '/ws'});
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  // console.log(req.url);
  // if (req.url === '/trains/') {
  //   res.status(302).redirect('/in/trains/');
  //   return;
  // }
  const urlSplit = req.url.split('/');
  // console.log(urlSplit, req.url);
  if (urlSplit[1] !== 'in') {
    res.status(302).redirect('/in' + req.url);
    return;
  }
  if (urlSplit[2].includes('-to-')) {
    let lastPartSplit = urlSplit[2].split('-to-');
    if (lastPartSplit.length == 2) {
      // console.log(lastPartSplit[1].split('-'));
      lastPartSplit[0] = lastPartSplit[0].split('-');
      lastPartSplit[1] = lastPartSplit[1].split('-');
      // const sourceStation = lastPartSplit[0].split('-').pop();
      // const destinationStation = lastPartSplit[1].split('-').pop();
      let newUrl = lastPartSplit[0].pop() + '-to-' + lastPartSplit[1].pop()
        + '-' + lastPartSplit[0].join('-') + '-to-' + lastPartSplit[1].join('-');
      res.status(302).redirect('/in/trains/' + newUrl);
      return;
    }
  }
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  let mobile;
  // console.log('targetUrl', targetUrl);
  const md = new MobileDetect(req.headers['user-agent']);
  mobile = !!md.os();
  const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }
  store.dispatch({type: 'app/IS_MOBILE', mobile: mobile});
  match({history, routes: getRoutes(store), location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );
        // res.status(200);
        // console.log(store.getState().app.status);

        global.navigator = {userAgent: req.headers['user-agent']};
        // res.status(store.getState().app.status);
        const html = '<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component}
                                        store={store}/>);
        res.status(store.getState().app.status).send(html);
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
