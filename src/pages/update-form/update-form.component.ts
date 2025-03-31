import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';

interface Application {
  applicantId: string;
  province: string;
  employmentStatus: string;
  annualIncome: number;
  selfReportedExpenses?: number;
  creditScore?: number;
  selfReportedDebt?: number;
  requestedAmount?: number;
  age?: number;
  monthsEmployed?: number;
  creditUtilization?: number;
  numOpenAccounts?: number;
  numCreditInquiries?: number;
  paymentHistory?: string;
  currentCreditLimit?: number;
  monthlyExpenses?: number;
  approved?: number;
  approvedAmount?: number;
  estimatedDebt?: number;
  interestRate?: number;
}

@Component({
  selector: 'app-updateform',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,
    ToastModule
  ],
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css'],
  providers: [MessageService]
})
export class UpdateformComponent implements OnInit {
  private apiUrl = 'http://localhost:8080/api/applications';
  updateForm: FormGroup;
  applicantId: string | null = null;

  provinces: Array<string> = ['ON', 'BC', 'QC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PEI'];
  employmentStatuses: Array<string> = ['Full-time', 'Part-time', 'Unemployed'];
  paymentHistories: Array<string> = ['On Time', 'Late <30', 'Late 30-60', 'Late >60'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.updateForm = this.fb.group({
      applicantId: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6}$')]],
      selfReportedExpenses: ['', [Validators.required, Validators.min(0), Validators.max(10000), Validators.pattern('^\\d*(\\.\\d+)?$')]],
      creditScore: ['', [Validators.required, Validators.min(300), Validators.max(900)]],
      annualIncome: ['', [Validators.required, Validators.min(20000), Validators.max(200000), Validators.pattern('^\\d*(\\.\\d+)?$')]],
      selfReportedDebt: ['', [Validators.required, Validators.min(0), Validators.max(10000), Validators.pattern('^\\d*(\\.\\d+)?$')]],
      requestedAmount: ['', [Validators.required, Validators.min(1000), Validators.max(50000), Validators.pattern('^\\d*(\\.\\d+)?$')]],
      age: ['', [Validators.required, Validators.min(19), Validators.max(100)]],
      province: ['', Validators.required],
      employmentStatus: ['', Validators.required],
      monthsEmployed: ['', [Validators.required, Validators.min(0), Validators.max(600)]],
      creditUtilization: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      numOpenAccounts: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
      numCreditInquiries: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      paymentHistory: ['', Validators.required],
      currentCreditLimit: ['', [Validators.min(0), Validators.max(50000)]],
      monthlyExpenses: ['', [Validators.min(0), Validators.max(10000)]],
      approved: [0, Validators.required],
      approvedAmount: ['', [Validators.min(0), Validators.max(50000)]],
      estimatedDebt: ['', [Validators.min(0), Validators.max(10000)]],
      interestRate: ['', [Validators.min(3.0), Validators.max(15.0)]]
    });
  }

  ngOnInit(): void {
    this.applicantId = this.route.snapshot.paramMap.get('applicantId');
    if (this.applicantId) {
      this.fetchApplicantData(this.applicantId);
    }
  }

  fetchApplicantData(applicantId: string): void {
    console.log('Fetching data for applicantId:', applicantId);
    this.http.get(`${this.apiUrl}/${applicantId}`).pipe(
      catchError(error => {
        console.error('Fetch Error Details:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message
        });
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch applicant data',
          life: 3000
        });
        return throwError(() => error);
      })
    ).subscribe((data: any) => {
      console.log('Fetched Data:', data);
      this.updateForm.patchValue(data);
    });
  }

  updateApplication(applicationData: any): Observable<any> {
    console.log('Updating application with data:', applicationData);
    return this.http.put(`${this.apiUrl}/${this.applicantId}`, applicationData).pipe(
      catchError(error => {
        console.error('Update Error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update application',
          life: 3000
        });
        return throwError(() => error);
      })
    );
  }

  onUpdate(): void {
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;
      this.updateApplication(formData).subscribe({
        next: (response: any) => {
          console.log('Update Success:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Application updated successfully!',
            life: 3000
          });
          this.router.navigate(['/applications']);
        },
        error: (error) => {
          console.error('Update Error:', error);
        }
      });
    } else {
      this.updateForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill all required fields correctly',
        life: 3000
      });
    }
  }

  get provincesList() {
    return this.provinces.map(p => ({ label: p, value: p }));
  }

  get employmentStatusList() {
    return this.employmentStatuses.map(status => ({ label: status, value: status }));
  }

  get paymentHistoryList() {
    return this.paymentHistories.map(history => ({ label: history, value: history }));
  }
}