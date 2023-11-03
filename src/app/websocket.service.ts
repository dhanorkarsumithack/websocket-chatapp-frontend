import { Injectable, OnInit } from "@angular/core";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from "rxjs";
import { AnonymousSubject } from "rxjs/internal/Subject";


@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements OnInit{

  private subject!: AnonymousSubject<MessageEvent>;
  private messages: Subject<string> = new Subject<string>();


  webSocketEndPoint: string = 'http://localhost:9000/ws';
  topic: string = "/topic/public";
  stompClient: any;
  message: any;

  constructor() {
  }
  ngOnInit() {
   
  }

      _connect(username:any) {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame:any) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent:any) {
                _this.onMessageReceived(sdkEvent);
            });
            _this.addUser(username);
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      // this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
   _send(payload:any) {
        console.log("calling sending message");
        this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(payload));
    }

    addUser(username:any){
      console.log("Added user with username ",username);
      this.stompClient.send("/app/chat.addUser",{},JSON.stringify({sender:username,type:'JOIN'}));
    }

    streamMessage:any;
    onMessageReceived(message:any) {
        console.log("Message Recieved from Server :: " + message);
        this.streamMessage= message.body;
        console.log(JSON.stringify(message.body));
        this.messages.next(JSON.parse(this.streamMessage));
    }

    getMessage(){
      return this.messages.asObservable();
    }
}
