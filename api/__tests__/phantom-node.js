var phantom = require("phantom");
var _ph, _page, _outObj;

phantom.create().then(ph => {
  _ph = ph;
  return _ph.createPage();
}).then(page => {
  _page = page;
  _page.property('onResourceRequested',function(request) {
    console.log('Request ' + JSON.stringify(request, undefined, 4));
  });
  _page.property('onResourceReceived', function(response) {
    console.log('Receive ' + JSON.stringify(response, undefined, 4));
  });

  return _page.open('https://www.google.co.in');
}).then(status => {

  // console.log(status);
  // var title = _page.evaluate(function() {
  //   return document.title;
  // });
  // console.log(title)
  return _page.evaluate(function() {
     document.getElementById('lst-ib').value = 'africa';
    return _page;
  });
}).then(content => {
  console.log(content);
  _page.close();
  _ph.exit();
});