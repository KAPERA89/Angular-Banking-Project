import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private http:HttpClient) {

   }

   public getAllCustomers():Observable<Array<Customer>>
   {
      return this.http.get<Customer[]>('http://localhost:8090/customers')
   }

   public searchCustomers(keyword:string):Observable<Customer[]>{
      return this.http.get<Customer[]>(`http://localhost:8090/customers/search?keyword=${keyword}`)
   }

   public saveCustomer(customer:Customer):Observable<Customer>{
     
      const headers = { 'content-type': 'application/json' ,
         'Access-Control-Allow-Origin':'*',
         'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
      }

      return this.http.post<Customer>('http://localhost:8090/customers',
      customer, {headers})
   }

   public getCustomer(id:number):Observable<Customer>{
      return this.http.get<Customer>(`http://localhost:8090/customers/${id}`)
   }

   // public updateCustomer(customer:Customer):Observable<Customer>{
   //    return this.http.put<Customer>(`http://localhost:8090/customers/${customer.id}`,customer)
   // }  

   public deleteCustomer(id:number){
      return this.http.delete(`http://localhost:8090/customer/${id}`)
   }


   // getHeader(){
   //    return new HttpHeaders({
   //       Accept : "application/json"
   //    })
   // }

}
