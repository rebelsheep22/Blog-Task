import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from 'src/models/users';

@Injectable({
  providedIn: 'root',
})
export class AccountServiceService {
  public user: Observable<any>;
  private userSubject: BehaviorSubject<any>;
  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }
  register(user: any) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }
  login(email: string, password: string) {
    return this.http
      .post(`${environment.apiUrl}/users/authenticate`, { email, password })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }
  getUserAuthor(){
    // const current
    return this.http.get<Users>(`${environment.apiUrl}/users/author`)

  }
  getUsers(){
    return this.http.get<Users[]>(`${environment.apiUrl}/users`);
  }
  getCurrentUser(){
    return this.http.get<Users[]>((`${environment.apiUrl}/currentUsers`))
  }
  logout() {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/account/login']);
    }
  }
  // changePermission(id:string,params:any){
  //   console.log((`${environment.apiUrl}/users/${id}`))
  //   return this.http.put<Users[]>(`${environment.apiUrl}/users/${id}`, params);

  // }

  public get userValue(): any {
    return this.userSubject.value;
}
}
