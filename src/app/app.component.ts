import { Component } from '@angular/core';
import { WebSocketService } from './websocket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  greeting: any;
  name: any;
  messages:any=[];
  message:any='';
  check:boolean=false;
  constructor(private ws: WebSocketService) {

  }

  msgData:any={};
  ngOnInit() {

    this.ws.getMessage().subscribe(data=>{
      this.msgData = data;      
      this.messages.push(this.msgData.content);
      
    })
  }

  startChat(username:any){
    this.ws._connect(username);
    this.check=true;
  }

  // connect() {
  //   this.ws._connect();
  //   console.log("connected");

  // }

  disconnect() {
    this.ws._disconnect();
  }

  payload:any={};
  sendMessage() {
    this.payload.content=this.message;
    this.payload.sender=this.name;
    this.payload.type='CHAT';
    console.log("payload",this.payload);
    
    this.ws._send(this.payload);
    this.message="";
  }

  // handleMessage(message: any) {
  //   this.greeting = this.ws.onMessageReceived(message);
  //   console.log(this.greeting);

  // }
  getMessage() {
   let msg = this.ws.getMessage();
  
    console.log("message",msg);
    this.messages.push(msg)
    
  }

 
}
