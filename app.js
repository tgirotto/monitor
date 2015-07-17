var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express();
 var exec = require('child_process').exec;

app.set('views', __dirname + '/views/pages');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  console.log('Serving page');
  res.render('index.ejs');
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
server.listen(8888);

var wss = new WebSocketServer({server: server});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

// function jps() {
//   var newChild = exec('ps -C java -o pid');

//   newChild.stdout.on('data', function(data) {
//     console.log('stdout: ' + data);
//       // wss.broadcast(data);
//       parse(data);
//   });
//   newChild.stderr.on('data', function(data) {
//     console.log('data: ' + data);
//     // wss.broadcast(data);
    
//   });
//   newChild.on('close', function(code) {
//     console.log('closing code: ' + code);
//   });
// }

// function parse(data) {
//   var array = data.split('\n');
//   for(var i = 0; i < array.length; i++) {
//     var trimmed = array[i].trim();

//     if(trimmed.length > 0 && trimmed != 'PID') {
//       console.log('trimmed: ', trimmed);
//       var spawn = exec('tail -f /proc/' + trimmed + '/fd/1')

//       spawn.stdout.on('data', function(data) {
//       console.log('stdout: ' + data);
//           wss.broadcast(data);
//       });
//       spawn.stderr.on('data', function(data) {
//         console.log('data: ' + data);
//         wss.broadcast(data);
//       });
//       spawn.on('close', function(code) {
//         console.log('closing code: ' + code);
//       });
//     }
//   }
// }

// setInterval(function() {
//   jps();
// }, 1000);