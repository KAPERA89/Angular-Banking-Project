import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { catchError } from 'rxjs/operators'

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  customers! : Observable<Customer[]>
  errorMessage : string | undefined

  constructor(private customerService:CustomerService){}

  ngOnInit(): void {  
      this.customers = this.customerService.getAllCustomers().pipe(
        catchError( err => {
            this.errorMessage = err.message
            return throwError(() => err)
          })
      );;

      // this.customerService.getAllCustomers().subscribe({
      //   next : data => this.customers = data,
      //   error : err => this.errorMessage = err.message 
      // })
  }
  

}
