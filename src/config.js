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
    title: 'Atmed Trains',
    description: 'Find trains between your favourite destinations. Get fare prices, pnr status, train info and trains running status.',
    head: {
      titleTemplate: '%s',
      defaultTitle: 'Atmed Trains: Trains between stations, PNR and Train status',
      meta: [
        {name: 'description', content: 'Find trains between your favourite destinations. Get fare prices, pnr status, train info and trains running status.'},
        {name: 'keywords', content: 'trains between station, pnr status, train running status, berth availability, fare price, ticket price, pnr check'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Atmed Trains'},
        {property: 'og:image', content: 'https://res.cloudinary.com/atmed/image/upload/c_scale,h_200,q_100/v1469877963/atmed_umufoy.png'},
        {property: 'og:locale', content: 'en_US'},
        // {property: 'og:card', content: 'summary'},
        // {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@AtmedInc'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'},
        {property: 'og:type', content: 'website'},
        {property: 'og:title', content: 'Atmed Trains'},
        {property: 'og:description', content: 'Find trains between your favourite destinations. Get fare prices, pnr status, train info and train running status.'},
        {property: 'og:url', content: 'https://www.atmed.co/in/trains'}
      ]
    }
  },

}, environment);
