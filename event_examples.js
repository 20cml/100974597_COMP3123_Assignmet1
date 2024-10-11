const events = require('events');
const eventEmitter =  new events.EventEmitter();

//create an event
const helloFn = () => {
    console.log('Hello, world!');
}
//create an event handler
eventEmitter.on('hello', helloFn);
//eventEmitter.addListener('hello', helloFn);

//fire the 'hello' event 
eventEmitter.emit('hello');
eventEmitter.emit('hello');

//remove the event handler
eventEmitter.removeListener('hello', helloFn);

//fire the 'hello' event again
eventEmitter.emit('hello'); // nothing will happen 

//create an event handler 
eventEmitter.on('greetings', (time, name)=>{
    console.log(`good ${time}, ${name}!`);
});

//fire the 'greetings' event
eventEmitter.emit('greetings', 'morning', 'Camila');
eventEmitter.emit('greetings', 'afternoon', 'Jessica');
eventEmitter.emit('greetings', 'night', 'Bruno');

//remove all listeners
eventEmitter.removeAllListeners('hello');
eventEmitter.removeAllListeners('greetings');

//create an event handler once 
eventEmitter.once('welcome', ()=>{
    console.log('welcome to the event!');
});
eventEmitter.emit('welcome');
eventEmitter.emit('welcome'); //nothing will happen





