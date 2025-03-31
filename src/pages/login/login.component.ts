import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService], // Only MessageService remains
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.http.get<any[]>('/assets/users.json').subscribe({
        next: (users) => {
          const user = users.find(u => u.email === email && u.password === password);
          if (user) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Login successful!',
              life: 3000
            });
            setTimeout(() => this.router.navigate(['/user-form']), 1000);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Invalid email or password.',
              life: 3000
            });
          }
        },
        error: (err) => {
          console.error('Error fetching users:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load user data.',
            life: 3000
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill out all fields correctly.',
        life: 3000
      });
      this.loginForm.markAllAsTouched();
    }
  }
}