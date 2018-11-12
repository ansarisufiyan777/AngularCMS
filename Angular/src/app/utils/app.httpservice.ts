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
    private urlUser = `${this.apiRoot}/user`;
    private urlAuth = `${this.apiRoot}/auth`;
    private urlComment = `${this.apiRoot}/comment`;
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

    upsertUser(user) {
        return Observable.create(observer => {
            console.log(user);
            this.http.post(this.urlUser, user).subscribe(res => {
                console.log(res.text());
                this.snackBar.open("New user added into the database", "Ok", {
                    duration: 2000,
                });
                observer.next(res.text());
            });
        })
    }

    authUser(user) {
        return Observable.create(observer => {
            this.http.post(this.urlAuth, user).subscribe(res => {
                console.log(res.text());
            });
        });

    }
    getPost(id) {
        return Observable.create(observer => {
            this.http.get(this.url+`?id=${id}`).subscribe(res => {
                observer.next(JSON.parse(res.text()));
            });
        });

    }

    getComments(id) {
        return Observable.create(observer => {
            this.http.get(this.urlComment+`?id=${id}`).subscribe(res => {
                observer.next(JSON.parse(res.text()));
            });
        });

    }

    upsertComment(comment) {
        return Observable.create(observer => {
            console.log(comment);
            this.http.post(this.urlComment, comment).subscribe(res => {
                console.log(res.text());
                this.snackBar.open("New comment added into the database", "Ok", {
                    duration: 2000,
                });
                observer.next(res.text());
            });
        })
    }
}