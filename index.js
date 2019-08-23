//Dependencies
const config = require('./config')
const readline = require('readline');
const chalk = require('chalk');
var mc = require('minecraft-protocol');

//Initializing
var client = mc.createClient({
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
});
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Readline listener
rl.on('line', (input) => {
  client.write('chat', {message: input});
});

//MC msg listener
client.on('chat', function(packet) {
  var jsonMsg = JSON.parse(packet.message);
  console.log(jsonMsg.extra);
});
