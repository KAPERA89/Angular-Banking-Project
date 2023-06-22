import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { Observable, catchError, throwError } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{

  accountFormGroup! : FormGroup;
  currentPage : number = 0;
  pageSize : number = 5;
  accountObservable! : Observable<AccountDetails>
  // account$! : Observable<AccountDetails> dollar signifie observable 
  operationsFormGroup! : FormGroup;
  errorMessage!: string;

  constructor(private fb:FormBuilder, private accountService: AccountsService) {}

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control('')
    })

    this.operationsFormGroup = this.fb.group({
      operationType : this.fb.control(null),
      accountDestination : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(''),
    })
  }

  handleSearchAccount() {
    let accountId: string = this.accountFormGroup.value.accountId
     this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
     );
    }

  goToPage(page: number){
      this.currentPage = page
      this.handleSearchAccount()
    }

  handleAccountOperation(){
      let accountSource: string = this.accountFormGroup.value.accountId;
      let accountDestination: string = this.operationsFormGroup.value.accountDestination;
      let amount: number = this.operationsFormGroup.value.amount;
      let operationType: string =this.operationsFormGroup.value.operationType;
      let description: string = this.operationsFormGroup.value.description;
      

      // if(operationType == 'DEBIT'){
      //   this.accountService.debit(accountId, amount, description).subscribe({
      //     next: (data) => {
      //       alert("Success")
      //       this.handleSearchAccount()
      //     },
      //     error: (err) => {console.log(err)}
      //   });
      // }else if(operationType == 'CREDIT'){
      //   this.accountService.credit(accountId, amount, description).subscribe({
      //     next: (data) => {
      //       alert("Success")
      //       this.handleSearchAccount();
      //     },
      //     error: (err) => {console.log(err)}
      //   });
      // }else if(operationType == 'TRANSFER'){
      //   this.accountService.transfer(accountId, accountDesctination, amount).subscribe({
      //     next: (data) => {
      //       alert("Success Transfer")
      //       this.handleSearchAccount();
      //     },
      //     error: (err) => {console.log(err)}
      //   });
      // }

    switch(operationType){
        case 'DEBIT': {
          this.accountService.debit(accountSource, amount, description).subscribe({
            next: (data) => {
              alert("Success")
              this.handleSearchAccount()
            },
            error: (err) => {console.log(err)}
          });
          break;
        }
        case 'CREDIT': {
          this.accountService.credit(accountSource, amount, description).subscribe({
            next: (data) => {
              alert("Success")
              this.handleSearchAccount();
            },
            error: (err) => {console.log(err)}
          });
          break;
        }
        case 'TRANSFER': {
          this.accountService.transfer(accountSource, accountDestination, amount).subscribe({
            next: (data) => {
              alert("Success Transfer")
              this.handleSearchAccount();
            },
            error: (err) => {console.log(err)}
          });
          break; 
        }
      }
    }

   
}
