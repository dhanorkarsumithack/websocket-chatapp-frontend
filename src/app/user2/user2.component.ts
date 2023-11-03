import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-user2',
  templateUrl: './user2.component.html',
  styleUrls: ['./user2.component.scss']
})
export class User2Component implements OnInit {
  
  messages:any=[];
  constructor(private ws:WebSocketService){}

  ngOnInit() {
    this.ws.getMessage().subscribe((data)=>{
      this.messages.push(data);
    })
  }


}
