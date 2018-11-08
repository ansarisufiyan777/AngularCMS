import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostDetailsComponent } from './post/post_details/postdetails.component';
import { LoginComponent } from './login/login.component';
import { NewPostDialog } from './post/new_post/app.new_post';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'posts', component: PostComponent },
  { path: 'post', component: PostDetailsComponent },
  { path: 'new-post', component: NewPostDialog },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
