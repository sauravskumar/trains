require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Trains', // done
    description: 'Check checkc ',
    head: {
      titleTemplate: '%s : Atmed', // done
      defaultTitle: 'Atmed Trains',
      meta: [
        {name: 'description', content: 'All the modern best practices in one example.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Atmed.co'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        // {property: 'og:card', content: 'summary'},
        // {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@atmedinc'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'},
        {property: 'og:type', content: 'website'},
      ]
    }
  },

}, environment);
