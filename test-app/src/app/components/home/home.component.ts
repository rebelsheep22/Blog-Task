import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  openTemplate!:any;
  ngOnInit(): void {

  }
  log(event:any){
    if(event === false)return;
    this.openTemplate= this.dialog.open(CreatePostComponent, {
      disableClose: true,
      data: {},
      height: '500px',
    });
  }
}
