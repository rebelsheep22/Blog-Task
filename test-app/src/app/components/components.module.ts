import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { PostTemplateComponent } from './post-template/post-template.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FullPostComponent } from './full-post/full-post.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [

    HomeComponent,
     PostTemplateComponent,
     PageHeaderComponent,
     CreatePostComponent,
     FullPostComponent,
     UsersPageComponent
  ],
  imports: [
    CommonModule,
    AccountModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class ComponentsModule { }
