# logger
Node JS Websocket Logger

## Usage

`node index.js`

Start a server on port 5000

[Look at the socket io client reference](https://github.com/socketio/socket.io-client)

## Integration with Angular > 2

Create a service like this : 

```javascript
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import io from 'socket.io-client';

export class LoggerService {
  private url = 'http://[url_of_your_server]:5000';  
  private socket;

  constructor(){
    this.socket = io(this.url);    
  }
  
  sendMessage(message){
    this.socket.emit('add-message', message);
    this.socket.disconnect();
  }
}
```

On your app.module.ts :

```javascript
import {ErrorHandler} from '@angular/core';
import { LoggerService } from './Services/logger/logger';
[...]
class MyErrorHandler implements ErrorHandler {
  handleError(error) {
    var logger = new LoggerService();    
    logger.sendMessage(""+error.message);    
  }
}

@NgModule({
[...]
providers: [
  [...]
  {provide: ErrorHandler, useClass: MyErrorHandler}
  [...]
]
})
[...]
```
