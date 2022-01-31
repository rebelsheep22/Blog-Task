import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from 'src/models/users';
import { AccountServiceService } from 'src/services/account-service.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'email',  'creationDate', 'groups'];
  dataSource:any;
  users!: Users[];
  selectedGroup!: string;
  currentUser!:Users;
  constructor(public accountService : AccountServiceService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getUserAuthor().subscribe((x:Users)=>
    {this.currentUser = x})
    this.accountService.getUsers().subscribe(x=>{this.users = x})
  }
  permissionChange(e: any,d:Users):void{
    console.log(d)
    d.groups = e.value;
    const users = JSON.parse(localStorage.getItem("blog-registration-module")!)
    let user = users.find((x: { id: string | undefined; }) => x.id === d.id);
    console.log(user)
    Object.assign(user, d);
    localStorage.setItem("blog-registration-module", JSON.stringify(users));
  }
  goBack(): void {
    this.router.navigate(['']);
 }
}
