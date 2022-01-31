import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/models/users';
import { AccountServiceService } from 'src/services/account-service.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<boolean>();
  openDialog= false;
  user!: Users;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountServiceService,

  ) {}


  ngOnInit(): void {
    console.log("test")
    this.openDialog = false;
    this.accountService.getUserAuthor().subscribe((x:Users)=>
    {this.user = x})
  }
  addNewPost(){
    this.openDialog = true;
    this.newItemEvent.emit(this.openDialog);
  }
  logout(): void {
    this.accountService.logout();
  }
  usersPage():void{
    this.router.navigateByUrl('/users')
  }
}
