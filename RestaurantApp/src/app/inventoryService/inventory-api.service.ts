import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryApiService {
  constructor(private _http:HttpClient) { }

  public ItemList : any =[]

  //create staff using post method
  postRestaurant(data:any){
    return this._http.post<any>("http://localhost:3000/inventory", data).pipe(map((res:any)=>{
      return res;
    }));
  }

  //get staff data using get method
  getRestaurant(){
    return this._http.get<any>("http://localhost:3000/inventory").pipe(map((res:any)=>{
      return res;
    }));
    
  }

/*
  getTotalAmount(){
    return this._http.get<any>("http://localhost:3000/inventory").pipe(map((res: any)=>{
      return res;
    }));
  }*/

  /*
  getTotalAmount() : number{
    let grandTotal = 0;
    this.ItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
*/


  //update staff using put method
  updateRestaurant(data:any, id:number){
    return this._http.put<any>("http://localhost:3000/inventory/"+id,data).pipe(map((res:any)=>{
      return res;
    }));
  }

  //delete staff using delete method
  deleteRestaurant(id:number){
    return this._http.delete<any>("http://localhost:3000/inventory/"+id).pipe(map((res:any)=>{
      return res;
    }));
  }

}