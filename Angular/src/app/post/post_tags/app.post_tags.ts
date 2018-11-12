import { Component, OnInit,Input  } from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { ShareBottomSheet } from '../../bottom_sheet/app.bottomsheet';
import { HttpService } from '../../utils/app.httpservice';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PushService } from '../../utils/app.push_service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'post-tags',
  templateUrl: './app.post_tags.html',
  styleUrls: ['./app.post_tags.scss']
})
export class PostTags implements OnInit {
  @Input() post ={};
  private id :any;
  private tagValue = null;
  constructor(private titleService: Title, private pushService: PushService,public snackBar: MatSnackBar,private httpService:HttpService,private bottomSheet: MatBottomSheet,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }
  addTags($event:any){
    if($event.target.value){
      this.post['tags'] = this.post['tags']+","+$event.target.value;
      this.httpService.upsertPost(this.post).subscribe(res=>{
        console.log("tags added successfully")
      })
      this.tagValue = '';
    }else{
      this.snackBar.open("tag feild cannot be blank", "Ok", {
        duration: 2000,
      });
    }
    
  }
  removeTag(v:any){
    var tags = this.post['tags'].split(',')
    var index = tags.indexOf(v);
    tags.splice(index,1).toString();
    this.post['tags'] = tags.toString();
    this.httpService.upsertPost(this.post).subscribe(res=>{
      console.log("tags removed successfully")
    })
    
  }
}
