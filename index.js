//Dependencies
const config = require('./config')
const readline = require('readline');
const chalk = require('chalk');
var mc = require('minecraft-protocol');
//Variables
const prefix = ".";
let colorNames = ["aqua", "dark_aqua", "blue", "gold", "black", "red", "dark_red", "green", "dark_green", "light_purple", "purple"]
let trueColors = ["blue", "blue", "blue", "yellow", "black", "red", "red", "green", "green", "magenta", "magenta"]
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
//Login
console.log("Zeta Terminal v.1.2")
console.log("Developed by Dragon Eye#1708 (https://github.com/DragonEy3)\n")
client.on('login', function () {
  console.log("Succesfully logged into " + config.host + " with " + config.username + "\n");
})
//Readline listener
rl.on('line', (input) => {
  if(!input.startsWith(prefix)) client.write('chat', {message: input});
  else{
    let arr = input.split(" ");
    let command = arr[0];
    let args = arr.slice(1);
    if(command === ".help"){
      console.log(chalk.cyan("List of commands:"))
      console.log(chalk.cyan(".help"))
      console.log(chalk.cyan(".ping"))
    }
    if(command === ".ping"){
      console.log(chalk.cyan("Latency is " + client.latency + "ms."))
    }
    if(command === ".info"){
      console.log("Zeta")
    }
  }
});

//MC msg listener
client.on('chat', function(packet) {
  var jsonMsg = JSON.parse(packet.message);
  //Logic for all non-achievements
  if(jsonMsg.translate === undefined){
    let msg = ""
    let path
    //Path for normal messages
    if(jsonMsg.extra[0].extra === undefined) path = jsonMsg.extra
    //Path for death messages
    else path = jsonMsg.extra[0].extra
    //Coloring for messages
    for(let i=0; i<path.length; i++){
      let index
      let flag = false
      if(path[i].color === undefined){
        msg += chalk.white(path[i].text)
        flag = true
      }
      else for(let j=0; j<colorNames.length; j++){
            if(path[i].color === colorNames[j]){
              msg += chalk[trueColors[j]](path[i].text)
              flag = true
            }
      }
      if(!flag) msg += chalk.white(path[i].text)
    }
    console.log(msg)
  }
  //Logic for achievements
  else console.log(chalk.white(jsonMsg.with[0].insertion + " has made the achievement:") + chalk.green(" [" + jsonMsg.with[1].extra[0].translate +"]"))
});
