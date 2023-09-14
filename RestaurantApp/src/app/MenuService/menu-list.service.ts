import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuListService {

  constructor(private _http:HttpClient) { }

  public ItemList : any =[]

  // postRestaurant(data: any, imageFile: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('name', data.name);
  //   formData.append('amount', data.amount.toString());
  //   formData.append('image', imageFile, imageFile.name); // Append the image file

  //   return this._http.post<any>("http://localhost:3000/menu", formData);
  // }

  //create staff using post method
  postRestaurant(data:any){
    return this._http.post<any>("http://localhost:3000/menu", data).pipe(map((res:any)=>{
      return res;
    }));
  }

  //get staff data using get method
  getRestaurant(){
    return this._http.get<any>("http://localhost:3000/menu").pipe(map((res:any)=>{
      return res;
    }));
    
  }


  //update staff using put method
  updateRestaurant(data:any, id:number){
    return this._http.put<any>("http://localhost:3000/menu/"+id,data).pipe(map((res:any)=>{
      return res;
    }));
  }

  //delete staff using delete method
  deleteRestaurant(id:number){
    return this._http.delete<any>("http://localhost:3000/menu/"+id).pipe(map((res:any)=>{
      return res;
    }));
  }

}