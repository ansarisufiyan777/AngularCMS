import { Component, OnInit,Input  } from '@angular/core';
import { HttpService } from '../utils/app.httpservice';
import { ShareBottomSheet } from '../bottom_sheet/app.bottomsheet';
import { MatBottomSheet, MatSnackBar, MatDialog } from '@angular/material';
import { PushService } from '../utils/app.push_service';

@Component({
  selector: 'post-dynamic',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  posts: Object[];

  constructor(public snackBar: MatSnackBar,private pushService: PushService,public dialog: MatDialog,private httpService:HttpService,private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.httpService.getPost(undefined).subscribe(postData => {
      this.posts = postData
    });

    this.pushService.onNewPost().subscribe(data => {
      var index = this.posts.map((p)=> { return p['post_id']; }).indexOf(data.post_id);
      if(index != -1){
        this.snackBar.open("New Event occurred on post", "Ok", {
          duration: 2000,
        });
        this.posts.splice(index,1,data)
      }
      else{
        this.posts.push(data);  
      }
    });
    this.pushService.onNewConnect().subscribe(data => {
      console.log("Connected with websocket")
    });
  }

  likePost($event: any){
    console.log($event);
    $event.likes = $event.likes?parseInt($event.likes)+1:1;
    this.httpService.upsertPost($event).subscribe(res =>{
      console.log("Post Liked successfully")
    });
  }
  dislikePost($event: any){
    $event.dislikes = $event.dislikes?parseInt($event.dislikes)+1:1;
    this.httpService.upsertPost($event).subscribe(res =>{
      console.log("Post DisLiked successfully")
    });
  }
  openShareBottomSheet($event:any){
    this.bottomSheet.open(ShareBottomSheet);
  }

}
