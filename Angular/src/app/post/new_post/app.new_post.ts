import {MatDialogRef, MatSnackBar} from '@angular/material';
import {Component, Inject} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { getLocaleDateTimeFormat } from '@angular/common';
import { PushService } from '../../utils/app.push_service';
import { HttpService } from '../../utils/app.httpservice';
import { PostData } from '../../post.data';

@Component({
    selector: 'new-post-dialog',
    templateUrl: 'app.new_post.html',
  })
  export class NewPostDialog {
    //private data:{};
    data: PostData = <PostData>{};

    constructor(
      public httpService: HttpService) {
        
      }
    createPost(): void {
      this.data["createdby"] = "snansari";
      this.httpService.upsertPost(this.data).subscribe(res =>{
        console.log("Post added successfully")
      });
    }
  
  }