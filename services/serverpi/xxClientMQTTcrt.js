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
var piOptions = {
  rejectUnauthorized: false,
  ca: ca
}
piClient = mqtt.connect(wss, piOptions);
console.log('trying to connect a')
piClient.on('connect', function(){
  console.log('maybe connected')
  piClient.subscribe('presence');
  piClient.subscribe('fromBrowser');
  piClient.subscribe('fromDevice');
  piClient.subscribe('fromBroker');
  console.log('Client publishing.. ');
  piClient.publish('presence', 'Client 1 is alive.. Test Ping! ' + Date());
  setInterval(function() {
    piClient.publish('fromProxy', 'proxy message' + Date());
  }, 5000);
  piClient.on('message', function(topic, payload) {
    console.log('['+topic+'] '+payload.toString())
  });   
})   

