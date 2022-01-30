import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Post } from 'src/models/post';
import { Users } from 'src/models/users';
import { AccountServiceService } from 'src/services/account-service.service';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss'],
})
export class FullPostComponent implements OnInit {
  id!: string;
  postForm!: FormGroup;
  post!:Post;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private accountService: AccountServiceService
  ) {}

  ngOnInit(): void {
    this.post = {};
    this.id = this.route.snapshot.params['id'];
    this.postForm= this.formBuilder.group({
      content:[null],
      imgURL:[null],
      uploadDate:[null],
      title:[null],
      id:[null],
      author:[null]
    });
    this.postService
      .getById((parseInt(this.id)-1).toString())
      .pipe(first())
      .subscribe((x) => this.post = x);
  }
  goBack(): void {
     this.router.navigate(['']);
  }
}
