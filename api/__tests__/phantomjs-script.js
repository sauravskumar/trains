const page = require('webpage').create();
var fs = require('fs');

console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36';
page.settings.loadImages = false;
page.customHeaders = {
  'Pragma': 'no-cache',
  'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6',
  // 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36',
  'Accept': '*/*',
  'Cache-Control': 'no-cache',
  'X-Requested-With': 'XMLHttpRequest',
  'Proxy-Connection': 'keep-alive',
  'Referer': 'http://enquiry.indianrail.gov.in/ntes/',
};
page.onInitialized = function () {
  page.customHeaders = {};
};
// page.onLoadFinished = function () {
//   console.log("page load finished");
//   page.render('export.png');
//   fs.write('1.html', page.content, 'w');
// };
var cookies, stringCookie = '';
page.onResourceRequested = function (requestData, networkRequest) {
  console.log('\n')
  // console.log('Request (#' + requestData.id + '): ' + (requestData));
  console.log('Request (#' + requestData.id + '): ' + (requestData.url));
  console.log('cookieString-> ', stringCookie);
  networkRequest.setHeader('Cookie', stringCookie);
  networkRequest.setHeader('Accept-Encoding', 'text/html');
  console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
};
page.onResourceReceived = function(response) {
  console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' );
  // fs.appendFile(__dirname + '/file.txt',JSON.stringify(response) + '\n\n');
  fs.write('1.json', JSON.stringify(response) + '\n\n', 'a');
};
page.open('http://enquiry.indianrail.gov.in/ntes/', function (status) {
  cookies = page.cookies;

  console.log('Listing cookies:');
  for (var i in cookies) {
    console.log(cookies[i].name + '=' + cookies[i].value);

    stringCookie += cookies[i].name + '=' + cookies[i].value + '; ';
  }

  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
    var ua = page.evaluate(function () {

      document.getElementById('trainInput').value = '12003';
      document.getElementById('trainInput').click();
      // console.log('value updated', new Date().toLocaleString())
      // var keyEvent = document.createEvent('KeyboardEvent');
      // Object.defineProperty(keyEvent, 'keyCode', {
      //   get : function() {
      //     return this.keyCodeVal;
      //   }
      // });
      // var evt = document.createEvent("KeyboardEvent");
      // evt.initKeyEvent ("keypress", true, true, window,
      //   0, 0, 0, 0,
      //   0, "e".charCodeAt(0))
      // var canceled = !body.dispatchEvent(evt);
      // keyEvent.keyCodeVal = 77;
      // document.getElementById('trainInput').dispatchEvent(keyEvent);
      return document.getElementById('trainInput').value
    });
    // document.querySelectorAll('textarea[style="display:none;"]')
    // document.querySelectorAll('input[type=submit]')
    //document.querySelectorAll('input[type=reset]')
    //document.querySelectorAll('input[type=checkbox]'
    console.log(ua);
    page.sendEvent('keypress', page.event.key.A, null, null, 0x02000000 | 0x08000000);
    cookies = page.cookies;

    console.log('Listing cookies:');
    for (var i in cookies) {
      console.log(cookies[i].name + '=' + cookies[i].value);
    }
    // var data = "start\n\n"
    // for (var i = 0; i < ua.length - 1; i++) {
    //   data += ('\n' + JSON.stringify(ua[i]))
    //   if (i == ua.length - 2) {
    //     fs.write('2.html', data, 'w');
    //   }
    // }
  }
});
// page.onLoadFinished = function () {
//   console.log("page load finished");
//   page.render('export.png');
//   fs.write('1.html', page.content, 'w');
// };

page.onLoadFinished = function () {
  // fs.write('1.html', page.content, 'w');
  // var ua = page.evaluate(function () {
  //   return document.querySelectorAll('input');
  // });
  setTimeout(function () {
    // console.log('exit', new Date.toLocaleString())
    phantom.exit();
  }, 10000)
}
