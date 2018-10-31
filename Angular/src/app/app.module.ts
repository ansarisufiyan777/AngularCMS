import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialAppModule } from './app.materials';
import { PostComponent } from './post/post.component';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostDialog } from './post_dialog/app.post_dialog';
import { FormsModule } from '@angular/forms';  
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http';
import { PushService } from './utils/app.push_service';
import { HttpService } from './utils/app.httpservice';
import { ShareBottomSheet } from './bottom_sheet/app.bottomsheet';
import { MatBottomSheet } from '@angular/material';
import { PostDetailsComponent } from './post/post_details/postdetails.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent, 
    PostDetailsComponent,
    LoginComponent,
    PostDialog,
    ShareBottomSheet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialAppModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxEditorModule 
  ],
  entryComponents: [AppComponent, PostDialog,ShareBottomSheet],
  providers: [PushService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
