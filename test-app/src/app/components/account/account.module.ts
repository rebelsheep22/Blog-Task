import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [LoginComponent,RegisterComponent, DashboardComponent],
  imports: [CommonModule,AccountRoutingModule, FormsModule, ReactiveFormsModule,MaterialModule],
})
export class AccountModule {}
