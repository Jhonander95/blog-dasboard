import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SubsribersComponent } from './subsribers/subsribers.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'categories', component: CategoriesComponent,  canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  { path: 'posts', component: AllPostComponent,  canActivate: [AuthGuard] },
  { path: 'posts/new', component: NewPostComponent, canActivate: [AuthGuard] },

  { path: 'subscribers', component: SubsribersComponent, canActivate: [AuthGuard] },
  {
    path: 'blog', loadChildren: () => import('./blog/blog.module').then(m=>m.BlogModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
