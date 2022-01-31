import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from 'src/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postSubject!: BehaviorSubject<Post>;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  public get postValue(): Post {
    return this.postSubject.value;
}
  getById(id: string) {
    return this.http.get<Post>(`${environment.apiUrl}/posts/${id}`);
}
  deleteById(id: string){
    const deleteId = parseInt(id)-1;
    id = deleteId.toString();
    return this.http.delete<Post>(`${environment.apiUrl}/posts/${id}`);
  }
  updatePost(id:string, params:Post){
    const deleteId = parseInt(id)-1;
    id = deleteId.toString();
    return this.http.put(`${environment.apiUrl}/posts/${id}`, params);
  }
}
