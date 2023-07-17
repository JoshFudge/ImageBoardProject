"use strict";

const http = require('http');

http.createServer( (req, resp) => {


resp.writeHead(200, {'Content-Type': 'text/html'})
resp.write(req.url);



resp.end();
}).listen(8080)