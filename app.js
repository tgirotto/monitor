// var WebSocketServer = require('ws').Server
//   , http = require('http')
//   , express = require('express')
//   , app = express();
 var exec = require('child_process').exec;
// var child = exec('tail -f ~/Projects/cafex/cafe-x-backend/nohup.out');

// app.set('views', __dirname + '/views/pages');
// app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res) {
//   res.render('index.ejs');
// });

// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     console.log(err.message);
// });

// var server = http.createServer(app);
// server.listen(3000);

// var wss = new WebSocketServer({server: server});

// wss.broadcast = function broadcast(data) {
//   wss.clients.forEach(function each(client) {
//     client.send(data);
//   });
// };

setInterval(function() {
  jps();
}, 3000);

function jps() {
  var newChild = exec('jps');

  newChild.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
      // wss.broadcast(data);
      parse(data);
  });
  newChild.stderr.on('data', function(data) {
    console.log('data: ' + data);
    // wss.broadcast(data);
    
  });
  newChild.on('close', function(code) {
    console.log('closing code: ' + code);
  });
}

function parse(data) {
  var array = data.split('\n');
  for(var i = 0; i < array.length; i++) {
    if(array[i].length > 0) {
      var temp = array[i].split(' ');
      console.log('pid', temp[0]);
      console.log('type', temp[1]);

      if(temp[1] == 'jar') {
        var spawn = exec('tail -f /proc/' + temp[0] + '/fd/1')

        spawn.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
            wss.broadcast(data);
        });
        spawn.stderr.on('data', function(data) {
          console.log('data: ' + data);
          wss.broadcast(data);
        });
        spawn.on('close', function(code) {
          console.log('closing code: ' + code);
        });
      }
    }
  }
}