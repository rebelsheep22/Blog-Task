import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Users } from 'src/models/users';

const usersKey = 'blog-registration-module';
const postsKey = 'postsArray';
let users = JSON.parse(localStorage.getItem(usersKey)!) || [];
@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req;
    return handleRoute();
    function handleRoute() {
      if (url.endsWith('/users/authenticate') && method === 'POST') {
        return authenticate();
      } else if (url.endsWith('/users/register') && method === 'POST') {
        return register();
      } else if (url.match(/\/posts\/\d+$/) && method === 'GET') {
        return getPostById();
      }
      else if (url.endsWith('users/author') && method == 'GET'){
        return getAuthorUser();
      }
      else if (url.endsWith('/users') && method == 'GET'){
        return getUsers();
      }
      else if (url.endsWith('/currentusers') && method == 'GET'){
        return getCurrentUser();
      }

    }
    function authenticate() {
      const { email, password } = body;
      const user = users.find(
        (x: Users) => x.email === email && x.passwords.password === password
      );
      if (!user) return error('Username or password is incorrect');
      return ok({
        ...basicDetails(user),
        token: 'fake-jwt-token',
      });
    }
    function basicDetails(user: {
      id: any;
      fullName: any;
      email: any;
      groups: any;
      creationDate: any;
    }) {
      const { id, fullName, email, groups, creationDate} = user;
      return { id, fullName, email, groups, creationDate };
    }
    function postDetails(post: {
      id: any;
      title: any;
      content: any;
      imgURL: any;
      uploadDate: any;
      author:any;
    }) {
      const { id, title, content, imgURL, uploadDate,author } = post;
      return { id, title, content, imgURL, uploadDate,author };
    }
    function register() {
      const user = body;

      if (users.find((x: { email: string }) => x.email === user.email)) {
        return error('Email "' + user.email + '" is already taken');
      }

      user.id = users.length
        ? Math.max(...users.map((x: { id: any }) => x.id)) + 1
        : 1;
      users.push(user);
      localStorage.setItem(usersKey, JSON.stringify(users));
      return <any>ok();
    }
    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }
    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
    function getCurrentUser(){
      const user = JSON.parse(localStorage.getItem('user')!) || [];
      console.log(user)
      return ok(basicDetails(user))
    }
    function unauthorized() {
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      }).pipe(materialize(), delay(500), dematerialize());
    }
    function getPostById() {
      let posts = JSON.parse(localStorage.getItem(postsKey)!) || [];
      const post = posts.find((x: { id: any }) => x.id === idFromUrl());
      return ok(postDetails(post));
    }
    function getAuthorUser(){
let authoringUser = JSON.parse(localStorage.getItem('user')!) || [];

      const authorId = authoringUser.id;
      const user = users.find((x: { id: string; })=> x.id == authorId)
      return ok(basicDetails(user))
    }
    function idFromUrl() {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1];
    }
    function getUsers() {
      return ok(users.map((x: { id: any; fullName: any; email: any; groups: any; creationDate: any; }) => basicDetails(x)));
    }
    function error(message: string) {
      return throwError({ error: { message } }).pipe(
        materialize(),
        delay(500),
        dematerialize()
      );
    }
  }
}
export const mockBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockBackendInterceptor,
  multi: true,
};
