import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetails } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }

  public getAccount(accountId: string, page: number, size: number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(`http://localhost:8090/accounts/${accountId}/pageOperations?page=${page}&size=${size}`);
  }

  public debit(id : string, amount: number, description: string){
    let data={
      accountId : id,
      amount,
      description  
    }
    return this.http.post("http://localhost:8090/accounts/debit",data);
  }

  public credit(id : string, amount: number, description: string){
    let data={
      accountId: id,
      amount,
      description  
    }
    return this.http.post("http://localhost:8090/accounts/credit",data);
  }

  public transfer(accountId: string, accountDestination: string, amount: number){
    let data={
      //accountSource : accountSource, ====  accountSource,
      accountId,
      accountDestination,
      amount,
    }
    console.log(data);
    return this.http.post("http://localhost:8090/accounts/transfer",data);
  }
}
