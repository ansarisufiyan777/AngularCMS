import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {Component, Inject} from '@angular/core';
import { PostData } from '../post.data';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { getLocaleDateTimeFormat } from '@angular/common';
import { PushService } from '../utils/app.push_service';
import { HttpService } from '../utils/app.httpservice';

@Component({
    selector: 'post-dialog',
    templateUrl: 'app.post_dialog.html',
  })
  export class PostDialog {
    private apiRoot = "http://localhost:8081";
    private url = 'http://localhost:/postcrud';
    private socket;

    constructor(public snackBar: MatSnackBar,private pushService: PushService,private http: Http,
      public dialogRef: MatDialogRef<PostDialog>,
      @Inject(MAT_DIALOG_DATA) public data: PostData,
      public httpService: HttpService) {
        
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    createPost(): void {
      this.data.createdby = "snansari";
      this.httpService.upsertPost(this.data).subscribe(res =>{
        console.log("Post added successfully")
      });
    }
  
  }