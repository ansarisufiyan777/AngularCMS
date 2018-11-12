import { OnInit, Component, Input } from "@angular/core";
import { HttpService } from "../../utils/app.httpservice";
import { ActivatedRoute } from "@angular/router";
import { PushService } from "../../utils/app.push_service";
import { MatSnackBar } from "@angular/material";

@Component({
    selector: 'post-comment',
    templateUrl: './post.comments.html',
    styleUrls: ['./post.comments.scss']
})
export class PostComments implements OnInit {
    private comments: CommentData[];
    comment: CommentData = <CommentData>{};
    private id;
    constructor(public snackBar: MatSnackBar,private route: ActivatedRoute,private httpService: HttpService,private pushService:PushService) {

    }
    ngOnInit(): void {
        this.id = this.route.snapshot.queryParamMap.get('id');
        this.httpService.getComments(this.id).subscribe((res) => {
            console.log(res);
            this.comments = res;
        })
        this.pushService.onNewComment().subscribe(data => {
            if(data.post_id == this.id){
                this.snackBar.open("New comment added on this post", "Ok", {
                    duration: 2000,
                  });
              this.comments.push(data);
            }
          });
    }
    postComment() {
        this.comment.post_id = this.id.toString();
        this.httpService.upsertComment(this.comment).subscribe(() => {
            console.log("Comments added successfully");
        })
    }
}
export interface CommentData {
    comment_id: string;
    user_name: string;
    message: string;
    post_id: string;
    datetime: string;
    createdby: string;
}