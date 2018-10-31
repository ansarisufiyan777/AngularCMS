import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class PushService {
  private socket: SocketIOClient.Socket;

  constructor(public snackBar: MatSnackBar) {
    this.socket = io('http://localhost/postcrud');
  }

  // EMITTER
  pushPost(msg) {
    this.socket.emit('NewPost', { message: msg });
  }

  // HANDLER
  onNewPost() {
    return Observable.create(observer => {
      this.socket.on('NewPost', msg => {
        console.log("New Post added from socket")        
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