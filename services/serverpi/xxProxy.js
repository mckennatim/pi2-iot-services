var mqtt = require('mqtt')
var fs = require('fs')

var ca, wss

if (process.argv[2] == 'hp'){
  console.log(process.argv[2], ' = hp')
  ca = fs.readFileSync('/home/iot/certs/sbCaChain.pem')
  wss = 'wss://10.0.1.100:2013'
}else if (process.argv[2]=='sb'){
  console.log(process.argv[2], ' = sb')
  ca = fs.readFileSync('/home/iot/certs/hpCaChain.pem')
  wss = 'wss://sitebuilt.net:2013'
}else{
  console.log('failure: broker arg is either on sb or hp')
  process.exit(1);
}

//options doesn't work for wss 
var xxOptions = {
  rejectUnauthorized: false,
  ca: ca
}
xxClient = mqtt.connect(wss, xxOptions);
console.log('trying to connect a')
xxClient.on('connect', function(){
  console.log('maybe connected')
  xxClient.subscribe('presence');
  xxClient.subscribe('fromBrowser');
  //xxClient.subscribe('fromDevice');
  //xxClient.subscribe('fromBroker');
  console.log('Client publishing.. ');
  xxClient.publish('presence', 'xxClient is alive.. Test Ping! ' + Date());
  // setInterval(function() {
  //   xxClient.publish('fromProxy', 'proxy message' + Date());
  // }, 5000);
  xxClient.on('message', function(topic, payload) {
    console.log('['+topic+'] '+payload.toString())
    piClient.publish(topic, payload)
  });   
})   

var piOptions = {
  port:2100,
  host:'10.0.1.229'
} 
//options can have username and password
piClient = mqtt.connect(piOptions);
console.log('trying to connect a')
piClient.on('connect', function(){
  console.log('maybe connected')
  //piClient.subscribe('presence');
  //piClient.subscribe('fromBrowser');
  piClient.subscribe('fromDevice');
  //piClient.subscribe('fromBroker');
  console.log('Client publishing.. ');
  piClient.publish('presence', 'piClient is alive.. Test Ping! ' + Date());
  piClient.on('message', function(topic, payload) {
    console.log('['+topic+'] '+payload.toString())
    xxClient.publish(topic, payload)
  });   
})   