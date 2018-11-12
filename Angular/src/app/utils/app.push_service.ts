import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class PushService {
  private socket: SocketIOClient.Socket;
  private commentSocket: SocketIOClient.Socket;

  constructor(public snackBar: MatSnackBar) {
    this.socket = io('http://localhost/events');
  }

  // HANDLER
  onNewPost() {
    return Observable.create(observer => {
      this.socket.on('post', msg => {
        console.log("New Post added from socket")
        observer.next(msg);
      });
    });
  }
  // HANDLER
  onNewComment() {
    return Observable.create(observer => {
      this.socket.on('comments', msg => {
        console.log("New comment added from socket")
        observer.next(msg);
      });
    });
  }

  // HANDLER
  onNewConnect() {
    return Observable.create(observer => {
      this.socket.on('NewConnection', msg => {
        this.snackBar.open("New connection added", "Ok", {
          duration: 2000,
        });
        observer.next(msg);
      });
    });
  }
}