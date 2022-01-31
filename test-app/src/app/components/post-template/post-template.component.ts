import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from 'src/models/post';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.scss'],
})
export class PostTemplateComponent implements OnInit {
  img: any;
  posts!: Post[];
  singlePost!: Post;
  imageURL!: string;
  title!: string;
  content!: string;
  description!: string;
  uploadDate!:string;
  author!: string;
  @Input() openDialog!: any;
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    let array = localStorage.getItem('postsArray');
    this.posts =  JSON.parse(localStorage.getItem("postsArray") as string) || [];

  }
  ngOnChanges(): void {
    if(this.openDialog){
      this.addNewPost()
    }
  }
  addNewPost(): void {
    const dialogRef = this.openDialog;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res) return;
      console.log(res)
      this.imageURL = res.imgURL.value;
      this.title = res.title.value;
      this.content = res.content.value;
      this.description = res.content.value.split(' ').splice(0, 60).join(' ');
      this.uploadDate = res.uploadDate.value;
      this.author = res.author.value;
      this.singlePost = {
        title: this.title,
        content: this.content,
        imgURL: this.imageURL,
        description: this.description,
        uploadDate: this.uploadDate,
        author:this.author
      };
      this.posts.push(this.singlePost);
      this.singlePost.id=this.posts.indexOf(this.singlePost).toString();
      localStorage.setItem('postsArray', JSON.stringify(this.posts));
    });
  }
  openFullPost(postArray: Post[], post:Post):void{
    let id = postArray.indexOf(post)+1;
    const routerString = "posts/"+id.toString();
    this.router.navigate([routerString]);
  }
}
