import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { PushService } from './app.push_service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {
    private apiRoot = "http://localhost:8081";
    private url = `${this.apiRoot}/posts`;
    constructor(public snackBar: MatSnackBar, private pushService: PushService, private http: Http, public dialog: MatDialog) {

    }

    upsertPost(postData) {
        return Observable.create(observer => {
            postData.createdby = "snansari";
            console.log(postData);
            this.http.post(this.url, postData).subscribe(res => {
                console.log(res.text());
                this.snackBar.open("New post added into the database", "Ok", {
                    duration: 2000,
                });
                observer.next(res.text());
            });
        });
    }
    deletePost() {
        return Observable.create(observer => {
            this.pushService.onNewPost().subscribe(data => {
                console.log("New Post added from socket")
                observer.next(data);
            });
        });
    }

    updatePost(id, column) {
        return Observable.create(observer => {
            this.http.get(this.url + `?id=${id}&column=${column}`).subscribe(res => {
                
            });
        })
    }
    getPost(id) {
        return Observable.create(observer => {
            this.http.get(this.url+`?id=${id}`).subscribe(res => {
                observer.next(JSON.parse(res.text()));
            });
        });

    }
}