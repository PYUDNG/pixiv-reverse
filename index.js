var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({
  secure: false,
});

// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  //proxyReq.setHeader('Referer', 'https://wenku8.net/');
  //proxyReq.setHeader('Host', 'wenku8.net');
  proxyReq.setHeader('Referer', 'https://www.pixiv.net/');
  proxyReq.setHeader('Host', 'www.pixiv.net');
});

// Catch errors
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Something went wrong. And we are reporting a custom error message.');
});

var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  //console.log(req.rawHeaders);
  proxy.web(req, res, {
    target: 'https://i.pximg.net' //i.pximg.net
  });
});

const PORT = process.env.PORT || 8888;
console.log("listening on port " + PORT.toString())
server.listen(PORT);
