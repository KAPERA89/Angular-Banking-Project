import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit{

  newCustomerFormGroup! : FormGroup

  constructor(private fb:FormBuilder, private customerService:CustomerService){}

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name : this.fb.control("", [Validators.required, Validators.minLength(4)]),
      email : this.fb.control("", [Validators.email, Validators.required])
    })
  }

  saveNewCustomer(){
      let customer= this.newCustomerFormGroup.value;

      this.customerService.saveCustomer(customer).subscribe({
        next : data => {alert("Customer created successfully")},
        error : err => console.log(err)
      });
  }

}
