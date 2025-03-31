import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../domain/customer'; 
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
  })
  export class CustomerService {


    constructor(private http: HttpClient, private messageService: MessageService) {}  

    updateCustomer(id: number, updatedCustomer: Customer): Promise<void> {
      // Simulate an update (replace with real API call if available)
      return new Promise((resolve) => {
        console.log(`Updating customer ${id} with`, updatedCustomer);
        resolve();
      });
    }

    private apiUrl = 'http://localhost:8080/api/applications';

    getApplications(page: number, size: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/list?page=${page}&size=${size}`).pipe(
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



    // private apiUrl = 'http://localhost:8080/api/applications'; // Backend endpoint


    // submitApplication(applicationData: any): Observable<any> {
    //   return this.http.post(this.apiUrl, applicationData).pipe(
    //     catchErrorror(error => {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: 'Failed to submit application',
    //         life: 3000
    //       });
    //       return throwError(() => error);
    //     })
    //   );
    // }





};