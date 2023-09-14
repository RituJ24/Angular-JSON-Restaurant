import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantDashComponent } from './restaurant-dash/restaurant-dash.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import Chart from 'chart.js/auto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'; //incompatible
import { RouterModule } from '@angular/router';
import { KnowmoreComponent } from './knowmore/knowmore.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ChartsDashboardComponent } from './charts-dashboard/charts-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MenuCardComponent } from './menu-card/menu-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantDashComponent,
    LoginComponent,
    SignupComponent,
    KnowmoreComponent,
    InventoryComponent,
    ChartsDashboardComponent,
    MenuCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
