import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { InputTextModule } from 'primeng/inputtext';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { ToggleButton, ToggleButtonModule } from 'primeng/togglebutton';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MenuModule } from 'primeng/menu';
import { MenuItem, MessageService } from 'primeng/api';
import { InputOtpModule } from 'primeng/inputotp';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';
import { HttpClient } from '@angular/common/http';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-userform',
  standalone:true,
  imports: [
    CommonModule, // Added for *ngIf
    InputOtpModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
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
  styleUrl: './userform.component.css',
  providers: [MessageService]

})




export class UserformComponent {
  private apiUrl = 'http://localhost:8080/api/applications'; // Backend endpoint

  localForm: FormGroup = new FormGroup([]);

  provinces: Array<string> = ['ON', 'BC', 'QC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PEI'];
  employmentStatuses: Array<string> = ['Full-time', 'Part-time', 'Unemployed'];
  paymentHistories: Array<string> = ['On Time', 'Late <30', 'Late 30-60', 'Late >60'];

  items: MenuItem[] | undefined;
  value1: string | undefined;
  value2: string | undefined;
  value3: string | undefined;
  text1: string | undefined;
  text2: string | undefined;
  number: string | undefined;
  value: any;
  selectedCity: City | undefined;

  cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  constructor(private fb: FormBuilder,  private messageService: MessageService, private http: HttpClient) { 
    
    

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
      // approved: [0, Validators.required], // Default to 0 (No)
      // approvedAmount: ['', [Validators.min(0), Validators.max(50000)]],
      estimatedDebt: ['', [Validators.min(0), Validators.max(10000)]],
      // interestRate: ['', [Validators.min(3.0), Validators.max(15.0)]]
    });
  }


  submitApplication(applicationData: any): Observable<any> {
    return this.http.post(this.apiUrl, applicationData).pipe(
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to submit application',
          life: 3000
        });
        return throwError(() => error);
      })
    );
  }

  ngOnInit(): void {

    this.items = [{ label: 'Web Search' }, { label: 'AI Assistant' }, { label: 'History' }];

   
  }

  submitForm(): void {
    if (this.localForm.valid) {
      console.log('Form Submitted', this.localForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  onSubmit() {
    if (this.localForm.valid) {
      const formData = this.localForm.value;
      
      this.submitApplication(formData).subscribe({
        next: (response: any) => { // Using 'any' for now since response isn't defined
          console.log('Form Submitted Successfully:', response);
          this.activeStep = 5;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Application submitted successfully!',
            life: 3000
          });
          this.localForm.reset();
        },
        error: (error) => {
          console.error('Submission Error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to submit application: ' + (error.message || 'Unknown error'),
            life: 3000
          });
        }
      });
    } else {
      console.log('Form Invalid:', this.localForm.errors);
      this.localForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill all required fields correctly',
        life: 3000
      });
    }
  }
  clickEvent(){
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Application submitted successfully!',
      life: 3000 // Message duration in milliseconds (3 seconds)
    });
  }

  get provincesList() {
    return this.provinces.map(p => ({ label: p, value: p }));
  }

  get employmentStatusList() {
    return this.employmentStatuses.map(status => ({ label: status, value: status }));
  }

  // stepper
  activeStep: number = 1;

  name: string | undefined | null = null;

  email: string | undefined | null = null;

  password: string | undefined | null = null;

  option1: boolean | undefined = false;

  option2: boolean | undefined = false;

  option3: boolean | undefined = false;

  option4: boolean | undefined = false;

  option5: boolean | undefined = false;

  option6: boolean | undefined = false;

  option7: boolean | undefined = false;

  option8: boolean | undefined = false;

  option9: boolean | undefined = false;

  option10: boolean | undefined = false;


}
