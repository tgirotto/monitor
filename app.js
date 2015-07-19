var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express();
var tools = require('./node_modules/tools.js');

/********************************************************************************/

var WORKING_DIRECTORY = '/Users/tommaso/Projects/cafex/cafe-x-backend/';
var PORT = 8888;
var wss;

/********************************************************************************/

app.set('views', __dirname + '/views/pages');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  tools.stream(WORKING_DIRECTORY, wss, function(scripts) {
    res.render('index.ejs', {scripts : scripts});
  });
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message);
});

var server = http.createServer(app);
server.listen(PORT);

wss = new WebSocketServer({server: server});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};