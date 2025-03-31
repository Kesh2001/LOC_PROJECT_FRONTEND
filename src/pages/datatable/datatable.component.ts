import { Component, OnInit, OnDestroy } from '@angular/core';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

interface Application {
  applicantId: string;
  province: string;
  employmentStatus: string;
  annualIncome: number;
  date?: string;
  status?: string;
  activity?: number;
  verified?: boolean;
  estimatedDebt?: number;
  creditScore?:number;
  currentCreditLimit?:number;
  approved?:boolean;
  interestRate?:number;
}

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    InputTextModule,
    TagModule,
    ProgressBarModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    SelectModule
  ],
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
  providers: [MessageService]
})
export class DatatableComponent implements OnInit, OnDestroy {
  applications: Application[] = [];
  loading: boolean = true;
  totalRecords: number = 0;
  rows: number = 10;
  private apiUrl = 'http://localhost:8080/api/applications';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  searchValue: string = '';
  employmentStatusFilter: string | null = null;
  provinceFilter: string | null = null;

  employmentStatuses = [
    { label: 'All Employment Statuses', value: null },
    { label: 'Part-time', value: 'Part-time' },
    { label: 'Full-time', value: 'Full-time' },
    { label: 'Unemployed', value: 'Unemployed' }
  ];

  provinces = [
    { label: 'All Provinces', value: null },
    { label: 'ON', value: 'ON' },
    { label: 'BC', value: 'BC' },
    { label: 'QC', value: 'QC' },
    { label: 'MB', value: 'MB' },
    { label: 'SK', value: 'SK' },
    { label: 'NS', value: 'NS' },
    { label: 'NB', value: 'NB' },
    { label: 'NL', value: 'NL' },
    { label: 'PEI', value: 'PEI' }
  ];

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) {
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.searchValue = value;
        this.loadApplications({ first: 0, rows: this.rows });
      });
  }

  ngOnInit() {
    this.loadApplications({ first: 0, rows: this.rows });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadApplications(event: TableLazyLoadEvent) {
    console.log('LazyLoad Event:', event);
    this.loading = true;
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows;
    const page = first / rows;

    this.getApplications(page, rows, this.searchValue, this.employmentStatusFilter, this.provinceFilter).subscribe({
      next: (response: any) => {
        console.log('Fetched Applications:', response.data);
        this.applications = response.data;
        this.totalRecords = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching applications:', error);
        this.loading = false;
      }
    });
  }

  private getApplications(
    page: number,
    size: number,
    applicantId?: string,
    employmentStatus?: string | null,
    province?: string | null
  ): Observable<any> {
    let url = `${this.apiUrl}/list?page=${page}&size=${size}`;
    if (applicantId) url += `&applicantId=${encodeURIComponent(applicantId)}`;
    if (employmentStatus) url += `&employmentStatus=${encodeURIComponent(employmentStatus)}`;
    if (province) url += `&province=${encodeURIComponent(province)}`;

    console.log('Request URL:', url);
    return this.http.get(url).pipe(
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch applications',
          life: 3000
        });
        return throwError(() => error);
      })
    );
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
    this.employmentStatusFilter = null;
    this.provinceFilter = null;
    this.loadApplications({ first: 0, rows: this.rows });
  }

  searchByApplicantId(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  filterEmploymentStatus(event: any) {
    this.employmentStatusFilter = event.value;
    this.loadApplications({ first: 0, rows: this.rows });
  }

  filterProvince(event: any) {
    this.provinceFilter = event.value;
    this.loadApplications({ first: 0, rows: this.rows });
  }

  navigateToUpdate(applicantId: string) {
    this.router.navigate(['/updateform', applicantId]); // Updated route
  }

  getSeverity(status?: string): 'success' | 'info' | 'warn' | 'danger' | undefined {
    if (!status) return undefined;
    switch (status.toLowerCase()) {
      case 'unqualified': return 'danger';
      case 'qualified': return 'success';
      case 'new': return 'info';
      case 'negotiation': return 'warn';
      case 'renewal': return undefined;
      default: return undefined;
    }
  }
}