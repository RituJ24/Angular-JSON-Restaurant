import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantData } from './restaurant.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css'],
})
export class RestaurantDashComponent {
  formValue!: FormGroup;
  restaurantModelObj: RestaurantData = new RestaurantData();
  allRestaurantData: any;
  showAdd!: boolean;
  showbtn!: boolean;

  constructor(private FormBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.FormBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
      salary: [''],
    });
    this.getAllData();
  }

  clickAddResto() {
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }

  //now subscribing our data which is map via services
  addResto() {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;
    this.restaurantModelObj.salary = this.formValue.value.salary;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Staff Records Added Successfully :)');
        //clear fill form data
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
        this.getAllData();
      },
      (err) => {
        alert('Something went wrong :(');
      }
    );
  }

  //Get all data
  getAllData() {
    this.api.getRestaurant().subscribe((res) => {
      this.allRestaurantData = res;
    });
  }

  //delete records
  deleteResto(data: any) {
    this.api.deleteRestaurant(data.id).subscribe((res) => {
      alert('Record Deleted Successfully');
      this.getAllData();
    });
  }

  //edit records
  onEditResto(data: any) {
    this.showAdd = false;
    this.showbtn = true;
    this.restaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
    this.formValue.controls['salary'].setValue(data.salary);
  }

  //update records
  updateResto() {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;
    this.restaurantModelObj.salary = this.formValue.value.salary;

    this.api
      .updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id)
      .subscribe((res) => {
        alert('Records Updated Successfully :)');
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
        this.getAllData();
      });
  }
}
