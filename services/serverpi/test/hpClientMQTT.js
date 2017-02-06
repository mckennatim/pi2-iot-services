var mqtt = require('mqtt')
 
// var piOptions = {
//   port: 8883,
//   host:'10.0.1.100'
// } 
//options can have username and password
//piClient = mqtt.connect('wss://sslvh.tm:2013', {rejectUnauthorized: false});
piClient = mqtt.connect('wss://10.0.1.100:2013', {rejectUnauthorized: false});
console.log('trying to connect s1')
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

