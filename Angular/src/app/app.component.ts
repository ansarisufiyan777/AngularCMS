import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PostDialog } from './post_dialog/app.post_dialog';
import {MatSnackBar} from '@angular/material';
import { PushService } from './utils/app.push_service';
import { HttpService } from './utils/app.httpservice';
import { RouterOutlet } from '@angular/router';
import { PostComponent } from './post/post.component';
import { Location } from '@angular/common';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  showHideBackButton:boolean = true;

  constructor(private location: Location,public snackBar: MatSnackBar,private pushService: PushService,public dialog: MatDialog,private httpService:HttpService) {
    
  }

  ngOnInit(): void {
    
  }
  openPostDialog(): void {
    const dialogRef = this.dialog.open(PostDialog, {
      height: '500px',
      width: '600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  onActivate($event):void{
    if($event instanceof PostComponent || $event instanceof LoginComponent){
      console.log("Activate" +$event);
      this.showHideBackButton = false;
    }else{
      this.showHideBackButton = true;
    }
  }
  goBack():void {
    this.location.back(); // <-- go back to previous location on cancel
  }
  
}
