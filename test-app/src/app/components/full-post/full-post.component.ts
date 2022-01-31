import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Post } from 'src/models/post';
import { Users } from 'src/models/users';
import { AccountServiceService } from 'src/services/account-service.service';
import { PostService } from 'src/services/post.service';
import { CreatePostComponent } from '../create-post/create-post.component';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss'],
})
export class FullPostComponent implements OnInit {
  id!: string;
  currentUser!: Users;
  postForm!: FormGroup;
  post!: Post;
  permissionToEdit!: boolean;
  permissionToDelete!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private accountService: AccountServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user')!)
    this.post = {};
    this.id = this.route.snapshot.params['id'];
    this.postForm = this.formBuilder.group({
      content: [null],
      imgURL: [null],
      uploadDate: [null],
      title: [null],
      id: [null],
      author: [null],
    });
    this.postService
      .getById((parseInt(this.id) - 1).toString())
      .pipe(first())
      .subscribe((x) => {
        this.post = x;
        if(this.currentUser.groups === "Admin"||(this.post.author === this.currentUser.fullName)){
          this.permissionToDelete = true;
          this.permissionToEdit = true;
        }
      });

  }
  goBack(): void {
    this.router.navigate(['']);
  }
  deletePost(): void {
    if (confirm('Are you sure you want to delelte the post')) {
      this.postService.deleteById(this.id).subscribe();
      this.router.navigate(['']);
    }
  }

  editPost(): void {
    const dialogRef = this.dialog.open(EditPostComponent, {
      data: this.post,
      width:"400px"
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res) return;
      console.log(res);
      this.postForm = res;
      console.log(this.postForm);
      this.postService
        .updatePost(this.id, {
          title: res.title.value,
          id: this.post.id,
          imgURL: this.post.imgURL,
          uploadDate: this.post.uploadDate,
          author: this.post.author,
          content: res.content.value,
          description: res.content.value.split(' ').splice(0, 60).join(' ')
        })
        .pipe(first())
        .subscribe();
        window.location.reload();
    });
  }
}
