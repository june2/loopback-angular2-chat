import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketConnection } from './shared/sdk/sockets/socket.connections';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	@ViewChild('scroll') private chatScrollContainer: ElementRef;
	
	messages: any = [];
	message: string = null;

	constructor(private socketConnection: SocketConnection) { }

	ngOnInit() {
		this.socketConnection.connect();
		this.getMessage();
	}

	ngOnDestroy() {
		if (this.socketConnection.isConnected()) {
			this.socketConnection.disconnect();
		}
	}

	/**
	 * @param message
   	 * @description send message
   	 **/
	sendMessage(message: string) {
		
		// deny empty message
		if (message === '') return;

		if (this.socketConnection.isConnected()) {			
			this.messages.push({ text: message, time: new Date(), isMe:true}); 
			this.socketConnection.emit('message:send', { text: message }); // send to server			
			this.message = '';
		}
		else {
			this.socketConnection.disconnect();
		}
	}

	/**	 
   	 * @description get messages
   	 **/
	getMessage() {
		this.socketConnection.on('message:receive', (data: any) => {
			this.messages.push(data); 
		});
	}

	/**	 
   	 * @description scroll to bottom
   	 **/
	scrollToBottom(): void {
		try {
			this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
		} catch (err) { }
	}

}
