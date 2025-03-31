// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserformComponent } from './pages/userform/userform.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DatatableComponent } from './pages/datatable/datatable.component';
import { UpdateformComponent } from './pages/update-form/update-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  {
    path: 'home',
    component: HomeComponent, // You might want a HomeComponent instead
  },
  {
    path: 'user-form',
    component: UserformComponent,
  },
  {
    path: 'projects',
    component: HomeComponent, // Placeholder; replace with a ProjectsComponent if needed
  },
  {
    path: 'Table',
    component: DatatableComponent, // Placeholder; replace with a ContactComponent if needed
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'updateform/:applicantId', component: UpdateformComponent },
];
