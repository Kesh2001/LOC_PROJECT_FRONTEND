import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {

  localForm: FormGroup = new FormGroup([]);

  provinces : Array<String>= ['ON', 'BC', 'QC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PEI'];
  employmentStatuses:Array<String> = ['Full-time', 'Part-time', 'Unemployed'];
  paymentHistories:Array<String> = ['On Time', 'Late <30', 'Late 30-60', 'Late >60'];

  constructor(private fb: FormBuilder) {}

  ngOnInit():void{
    this.localForm=this.fb.group({
      applicantId:['',[Validators.required,Validators.pattern('^[A-Za-z0-9]{6}$')]],
      selfReportedExpenses: ['', [Validators.required, Validators.min(0), Validators.max(10000),Validators.pattern('^\\d*(\\.\\d+)?$')]],
      creditScore: ['', [Validators.required, Validators.min(300), Validators.max(900)]],
      annualIncome: ['', [Validators.required, Validators.min(20000), Validators.max(200000),Validators.pattern('^\\d*(\\.\\d+)?$')]],
      selfReportedDebt: ['', [Validators.required, Validators.min(0), Validators.max(10000)],Validators.pattern('^\\d*(\\.\\d+)?$')],
      requestedAmount: ['', [Validators.required, Validators.min(1000), Validators.max(50000)],Validators.pattern('^\\d*(\\.\\d+)?$')],
      age: ['', [Validators.required, Validators.min(19), Validators.max(100)]],
      province: ['', Validators.required],
      employmentStatus: ['', Validators.required],
      monthsEmployed: ['', [Validators.required, Validators.min(0), Validators.max(600)]],
      creditUtilization: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      numOpenAccounts: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
      numCreditInquiries: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      paymentHistory: ['', Validators.required],






    })

  }

  submitForm(): void {
    if (this.localForm.valid) {
      console.log('Form Submitted', this.localForm.value);
    } else {
      console.log('Form is invalid');
    }
  }


}
