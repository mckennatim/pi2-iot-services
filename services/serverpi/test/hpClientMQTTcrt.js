var mqtt = require('mqtt')
var fs = require('fs')
var ca = fs.readFileSync('/home/iot/certs/hpCaChain.pem')
console.log(ca)
 
//options doesn't work for wss 
var piOptions = {
  rejectUnauthorized: false,
  ca: ca
}
//piClient = mqtt.connect('mqtt://sitebuilt.net:2012');
piClient = mqtt.connect('wss://10.0.1.100:2013', piOptions);
//piClient = mqtt.connect('mqtt://sitebuilt.net:2002');
//piClient = mqtt.connect('mqtt://parleyvale.com:2002');
//piClient = mqtt.connect(piOptions);
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

