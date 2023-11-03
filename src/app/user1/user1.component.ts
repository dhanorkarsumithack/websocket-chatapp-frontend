import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-user1',
  templateUrl: './user1.component.html',
  styleUrls: ['./user1.component.scss']
})
export class User1Component implements OnInit {

  message:any;
  receivedMessage:any=[];

  constructor(private ws:WebSocketService)
  {}
  ngOnInit(){
    this.ws.getMessage().subscribe((data)=>{
       this.receivedMessage.push(data);
    })
  }
  sendMessage(){
       this.ws._send(this.message)
  }
}
