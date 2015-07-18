$( document ).ready(function() {
    console.log("Running...");

	// var connection = new WebSocket('ws://104.199.153.65:8888');
	var connection = new WebSocket('ws://localhost:8888');

	// When the connection is open, send some data to the server
	connection.onopen = function() {
	  connection.send('Ping'); // Send the message 'Ping' to the server
	};

	// Log errors
	connection.onerror = function(error) {
	  console.log('WebSocket Error ' + error);
	};

	// Log messages from the server
	connection.onmessage = function(e) {
		var terminal = document.getElementById('terminal-body');
	  	terminal.innerHTML += e.data;
	  	terminal.scrollTop = terminal.scrollHeight;
	};
});