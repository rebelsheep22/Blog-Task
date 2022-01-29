import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Post } from 'src/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getById(id: string) {
    return this.http.get<Post>(`${environment.apiUrl}/posts/${id}`);
}
}
