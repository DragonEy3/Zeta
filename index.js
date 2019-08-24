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
console.log("Zeta Terminal v.1.0")
console.log("Developed by Dragon Eye#1708 (https://github.com/DragonEy3)\n")
//Readline listener
rl.on('line', (input) => {
  client.write('chat', {message: input});
});

//MC msg listener
client.on('chat', function(packet) {
  var jsonMsg = JSON.parse(packet.message);
  //Logic for all non-achievements
  if(jsonMsg.translate === undefined){
    //Logic for normal messages
    let msg = ""
    let path
    if(jsonMsg.extra[0].extra === undefined) path = jsonMsg.extra
    //Logic for death messages
    else path = jsonMsg.extra[0].extra
    for(let i=0; i<path.length; i++){
      if(path[i].color === undefined) msg += chalk.white(path[i].text)
      else if(path[i].color === "dark_aqua") msg += chalk.blue(path[i].text)
      else if(path[i].color === "gold") msg += chalk.yellow(path[i].text)
      else if(path[i].color === "dark_red") msg += chalk.red(path[i].text)
      else if(path[i].color === "red") msg += chalk.red(path[i].text)
      else if(path[i].color === "green") msg += chalk.green(path[i].text)
      else if(path[i].color === "light_purple") msg += chalk.magenta(path[i].text)
      else if(path[i].color === "black") msg += chalk.black(path[i].text)
      else chalk.white(msg += path[i].text)
    }
    console.log(msg)
  }
  //Logic for achievements
  else console.log(chalk.white(jsonMsg.with[0].insertion + " has made the achievement:") + chalk.green(" [" + jsonMsg.with[1].extra[0].translate +"]"))
});
