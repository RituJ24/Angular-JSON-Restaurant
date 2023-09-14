import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InventoryData } from './menu-card.model';
import { MenuListService } from '../MenuService/menu-list.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit{
  inventoryForm!: FormGroup
  inventoryModelObj: InventoryData = new InventoryData;
  allInventoryData: any;
  totalAmount = 0;
  totalQuantity = 0;
  showAdd!: boolean;
  showbtn!: boolean;
  items:InventoryData[] = [];

  constructor(private FormBuilder: FormBuilder, private api: MenuListService) { }

  ngOnInit(): void {
    this.inventoryForm = this.FormBuilder.group({
      itemName: [''],
      image: [''],
      amount: ['']
    })
    this.getAllData();
  }

  clickAddResto(){
    this.inventoryForm.reset();
    this.showAdd= true;
    this.showbtn= false;
  }

  // addResto() {
  //   this.inventoryModelObj.itemName = this.inventoryForm.value.itemName;
  //   this.inventoryModelObj.amount = this.inventoryForm.value.amount;
  
  //   const imageFile = this.inventoryForm.value.image; // Get the image file from the form
  
  //   this.api.postRestaurant(this.inventoryModelObj, imageFile).subscribe(
  //     (res) => {
  //       console.log(res);
  //       alert("Record Added Successfully :)");
  //       this.inventoryForm.reset();
  //       this.getAllData();
  //     },
  //     (err) => {
  //       alert("Something went wrong :(");
  //     }
  //   );
  // }
  

  //now subscribing our data which is map via services
  addResto() {
    this.inventoryModelObj.itemName = this.inventoryForm.value.itemName;
    this.inventoryModelObj.image = this.inventoryForm.value.image;
    this.inventoryModelObj.amount = this.inventoryForm.value.amount;

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
     
    })
  }

  totalPrice(){
    return this.allInventoryData.map((t: { amount: any; }) => t.amount).reduce((acc: any, value: any) => acc + value, 0);
  }

  getTotalQuantity(){
    return this.allInventoryData.map((t: { quantity: any; }) => t.quantity).reduce((acc: any, value: any ) => acc + value, 0);
  }

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
    this.inventoryForm.controls['image'].setValue(data.image);
    this.inventoryForm.controls['amount'].setValue(data.amount);
  }

  //update records
  updateResto(){
    this.inventoryModelObj.itemName = this.inventoryForm.value.itemName;
    this.inventoryModelObj.image = this.inventoryForm.value.image;
    this.inventoryModelObj.amount = this.inventoryForm.value.amount;

    this.api.updateRestaurant(this.inventoryModelObj, this.inventoryModelObj.id).subscribe(res=>{
      alert("Records Updated Successfully :)");
      let ref = document.getElementById('clear');
      ref?.click();

      this.inventoryForm.reset();
      this.getAllData();
    })
  }
}
