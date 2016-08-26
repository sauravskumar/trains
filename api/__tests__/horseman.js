/**
 * Created by saurav on 26/8/16.
 */
const Horseman = require('node-horseman');

// const horseman = new Horseman();
// horseman
//   .on('resourceReceived', function( msg ){
//     console.log(msg);
//   })
//   .userAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36')
//   .open(`http://enquiry.indianrail.gov.in/ntes/`)
//   .type('input[id="trainInput"]', '18111')
//   .keyboardEvent('keypress', 16777221)
//   .cookies()
  // .log() // []
  // .close();


const horseman = new Horseman();
horseman
  .on('resourceReceived', function( data ){
    if (data.url != undefined && data.url.indexOf('showAllCancelledTrains')>-1){
      console.log(data.url);
    }
  })
  .userAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36')
  .open(`http://enquiry.indianrail.gov.in/ntes/`)
  .click('[href="#tabs-5"]')
  .cookies();