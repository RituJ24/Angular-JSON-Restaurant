import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InventoryData } from './inventory.model';
import { InventoryApiService } from '../inventoryService/inventory-api.service'; 

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit{
  inventoryForm!: FormGroup
  inventoryModelObj: InventoryData = new InventoryData;
  allInventoryData: any;
  totalAmount = 0;
  totalQuantity = 0;
  showAdd!: boolean;
  showbtn!: boolean;
  items:InventoryData[] = [];

  constructor(private FormBuilder: FormBuilder, private api: InventoryApiService) { }

  ngOnInit(): void {
    this.inventoryForm = this.FormBuilder.group({
      itemName: [''],
      date: [''],
      amount: [''],
      quantity: [''],
    })
    this.getAllData();
  }

  clickAddResto(){
    this.inventoryForm.reset();
    this.showAdd= true;
    this.showbtn= false;
  }

  //now subscribing our data which is map via services
  addResto() {
    this.inventoryModelObj.itemName = this.inventoryForm.value.itemName;
    this.inventoryModelObj.date = this.inventoryForm.value.date;
    this.inventoryModelObj.amount = this.inventoryForm.value.amount;
    this.inventoryModelObj.quantity = this.inventoryForm.value.quantity;

    this.api.postRestaurant(this.inventoryModelObj).subscribe(res => {
      console.log(res);
      alert("Records Added Successfully :)");
      //clear fill form data
      let ref = document.getElementById('clear');
      ref?.click();

      this.inventoryForm.reset();
      this.getAllData();
    },
      err => {
        alert("Something went wrong :(");
      }

    )
  }

  

  //Get all data
  getAllData() {
    this.api.getRestaurant().subscribe(res => {
      this.allInventoryData = res;
      this.totalAmount = this.totalPrice();
      this.totalQuantity = this.getTotalQuantity();
     // this.totalAmount += this.allInventoryData.amount;
      
     // this.allInventoryData.map(t : t.amount).reduce((total, ))
     // this.totalamount = this.inventory.totalPrice;
     // this.totalamount = this.api.getTotalAmount();
    })
  }

  totalPrice(){
    return this.allInventoryData.map((t: { amount: any; }) => t.amount).reduce((acc: any, value: any) => acc + value, 0);
  }

  getTotalQuantity(){
    return this.allInventoryData.map((t: { quantity: any; }) => t.quantity).reduce((acc: any, value: any ) => acc + value, 0);
  }
/*
  totalPrice(){
    this.api.getRestaurant().subscribe(res => {
      this.totalAmount += this.inventoryModelObj.amount;
      /*forEach((item: { amount: number; }) => {
        this.totalAmount += item.amount;
    });
    *

    return this.totalAmount;
    })


}
*/
/*
  totalAmount(){
   // this.totalAmount = 0
    //this.inventoryForm.controls['amount'].setValue(data.amount)
   /* this.inventoryForm.controls['amount'].get(any =>{

    })
    
   
    this.Items.forEach(item =>{
      this.totalAmount += item.amount;
    })
  }
*/
  //delete records
  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res => {
      alert("Record Deleted Successfully");
      this.getAllData();
    })
  }

  //edit records
  onEditResto(data:any){
    this.showAdd= false;
    this.showbtn= true;
    this.inventoryModelObj.id = data.id;
    this.inventoryForm.controls['itemName'].setValue(data.itemName);
    this.inventoryForm.controls['date'].setValue(data.date);
    this.inventoryForm.controls['amount'].setValue(data.amount);
    this.inventoryForm.controls['quantity'].setValue(data.quantity);
  }

  //update records
  updateResto(){
    this.inventoryModelObj.itemName = this.inventoryForm.value.itemName;
    this.inventoryModelObj.date = this.inventoryForm.value.date;
    this.inventoryModelObj.amount = this.inventoryForm.value.amount;
    this.inventoryModelObj.quantity = this.inventoryForm.value.quantity;

    this.api.updateRestaurant(this.inventoryModelObj, this.inventoryModelObj.id).subscribe(res=>{
      alert("Records Updated Successfully :)");
      let ref = document.getElementById('clear');
      ref?.click();

      this.inventoryForm.reset();
      this.getAllData();
    })
  }
}