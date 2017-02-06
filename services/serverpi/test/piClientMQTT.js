var mqtt = require('mqtt')
 
var piOptions = {
	port:2100,
	host:'10.0.1.229'
} 
//options can have username and password
piClient = mqtt.connect(piOptions);
console.log('trying to connect a')
piClient.on('connect', function(){
	console.log('maybe connected')
	piClient.subscribe('presence');
	piClient.subscribe('fromBrowser');
	piClient.subscribe('fromDevice');
	piClient.subscribe('fromBroker');
	console.log('Client publishing.. ');
	piClient.publish('presence', 'Client 1 is alive.. Test Ping! ' + Date());
	piClient.on('message', function(topic, payload) {
		console.log('['+topic+'] '+payload.toString())
	});		
})	 

