import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-signup',
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
  providers: [MessageService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      applicantId: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6}$')]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.signupForm.valid) {
      const newUser = this.signupForm.value;
      console.log('New User Registered:', newUser); // In development, log to console
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Signup successful! Please login.',
        life: 3000
      });
      // Redirect to login after a short delay
      setTimeout(() => this.router.navigate(['/login']), 1000);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill out all fields correctly.',
        life: 3000
      });
      this.signupForm.markAllAsTouched();
    }
  }
}