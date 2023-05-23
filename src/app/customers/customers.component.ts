import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { catchError } from 'rxjs/operators'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  customers! : Observable<Customer[]>
  errorMessage : string | undefined
  searchFormGroup : FormGroup | undefined


  constructor(private customerService:CustomerService, private fb:FormBuilder){}

  ngOnInit(): void {  

    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    })

      // this.customers = this.customerService.getAllCustomers().pipe(
      //   catchError( err => {
      //       this.errorMessage = err.message
      //       return throwError(() => err)
      //     })
      // );;

      this.handleSearchCustomers();

      // this.customerService.getAllCustomers().subscribe({
      //   next : data => this.customers = data,
      //   error : err => this.errorMessage = err.message 
      // })
  }

  handleSearchCustomers(){
    //? means s'il a une valeur // on peut avoir que SearchFormGroup recoit une valeur undefined
      let kw = this.searchFormGroup?.value.keyword;
      this.customers = this.customerService.searchCustomers(kw).pipe(
        catchError( err => {
            this.errorMessage = err.message
            return throwError(() => err)
          })
      );
  }
}


