import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CategoryNavbarComponent } from './layout/category-navbar/category-navbar.component';
import { PostCardComponent } from './layout/post-card/post-card.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { TermsAndConditionComponent } from './pages/terms-and-condition/terms-and-condition.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from '../../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoryNavbarComponent,
    PostCardComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    SingleCategoryComponent,
    SinglePostComponent,
    TermsAndConditionComponent,
    SubscriptionFormComponent,
    CommentFormComponent,
    CommentListComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class BlogModule { }
