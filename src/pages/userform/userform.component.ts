import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
// All your PrimeNG imports
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { ToggleButton } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { InputOtpModule } from 'primeng/inputotp';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';
 
interface City {
  name: string;
  code: string;
}
 
@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputOtpModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    IconFieldModule,
    FloatLabelModule,
    MenuModule,
    StepperModule,
    TabsModule,
    ToggleButton,
    InputIconModule,
    PasswordModule,
    ToastModule,
  ],
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css'],
  providers: [MessageService],
})
export class UserformComponent {
  // 1) Point directly to your Python service endpoint:
  private pythonApiUrl = 'http://localhost:5050/predict';
 
  localForm: FormGroup;
 
  // Sample data for dropdowns, etc.
  provinces: Array<string> = ['ON', 'BC', 'QC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PEI'];
  employmentStatuses: Array<string> = ['Full-time', 'Part-time', 'Unemployed'];
  paymentHistories: Array<string> = ['On Time', 'Late <30', 'Late 30-60', 'Late >60'];
 
  items: MenuItem[] | undefined;
  selectedCity: City | undefined;
  cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
 
  // Stepper example usage
  activeStep: number = 1;
 
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private http: HttpClient
  ) {
    // 2) Form fields with validations
    this.localForm = this.fb.group({
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
      estimatedDebt: ['', [Validators.min(0), Validators.max(10000)]],
      // If you want to store DTI, add it here:
      // dti: ['', [Validators.min(0), Validators.max(100)]],
    });
  }
 
  ngOnInit(): void {
    // Example menu items for your UI
    this.items = [
      { label: 'Web Search' },
      { label: 'AI Assistant' },
      { label: 'History' },
    ];
  }
 
  // 3) This method calls the Python endpoint
  submitPrediction(pythonData: any): Observable<any> {
    // Post to the Flask /predict route
    return this.http.post(this.pythonApiUrl, pythonData).pipe(
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to call Python /predict',
          life: 3000,
        });
        return throwError(() => error);
      })
    );
  }
 
  // 4) Convert form fields to the JSON keys your app.py expects
  buildPythonRequest() {
    const formData = this.localForm.value;
    return {
      applicant_id: formData.applicantId,
      self_reported_expenses: formData.selfReportedExpenses,
      credit_score: formData.creditScore,
      annual_income: formData.annualIncome,
      self_reported_debt: formData.selfReportedDebt,
      requested_amount: formData.requestedAmount,
      age: formData.age,
      province: formData.province,
      employment_status: formData.employmentStatus,
      months_employed: formData.monthsEmployed,
      credit_utilization: formData.creditUtilization,
      num_open_accounts: formData.numOpenAccounts,
      num_credit_inquiries: formData.numCreditInquiries,
      payment_history: formData.paymentHistory,
      current_credit_limit: formData.currentCreditLimit,
      monthly_expenses: formData.monthlyExpenses,
      estimated_debt: formData.estimatedDebt,
      // dti: formData.dti || 0, // if you have it
    };
  }
 
  // 5) Submit the form and call the Python service
  onSubmit() {
    if (this.localForm.valid) {
      // Build the JSON data in the shape your Flask code expects
      const pythonPayload = this.buildPythonRequest();
 
      // Actually send it to Python
      this.submitPrediction(pythonPayload).subscribe({
        next: (result) => {
          console.log('Prediction result from Python:', result);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Prediction & data submitted to Python!',
            life: 3000,
          });
          this.localForm.reset();
          this.activeStep = 5; // Example step
        },
        error: (err) => {
          console.error('Error from Python service:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error calling Python /predict: ' + (err.message || 'Unknown'),
            life: 3000,
          });
        },
      });
    } else {
      console.log('Form invalid:', this.localForm.errors);
      this.localForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill all required fields correctly',
        life: 3000,
      });
    }
  }
 
  // Optional method if you want a test button or Toast
  clickEvent() {
    this.messageService.add({
      severity: 'success',
      summary: 'Click Event',
      detail: 'Test button clicked!',
      life: 3000,
    });
  }
 
  // Helper getters for your dropdowns
  get provincesList() {
    return this.provinces.map((p) => ({ label: p, value: p }));
  }
 
  get employmentStatusList() {
    return this.employmentStatuses.map((status) => ({
      label: status,
      value: status,
    }));
  }
}