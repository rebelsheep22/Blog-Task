import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullPostComponent } from './components/full-post/full-post.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './helpers/auth.guard';
const accountModule = () =>
  import('./components/account/account.module').then((x) => x.AccountModule);
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'posts/:id', component: FullPostComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
