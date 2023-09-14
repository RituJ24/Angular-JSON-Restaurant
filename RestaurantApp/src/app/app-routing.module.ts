import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RestaurantDashComponent } from './restaurant-dash/restaurant-dash.component';
import { KnowmoreComponent } from './knowmore/knowmore.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ChartsDashboardComponent } from './charts-dashboard/charts-dashboard.component';
import { MenuCardComponent } from './menu-card/menu-card.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'knowmore',
    pathMatch: 'full', //null route to default login page
  },
  {
    path: 'login',
    component: LoginComponent, //route to login
  },
  {
    path: 'signup',
    component: SignupComponent, //route to signup
  },
  {
    path: 'restaurant',
    component: RestaurantDashComponent, //route to homepage
  },
  {
    path: 'knowmore',
    component: KnowmoreComponent, //dashboard to knowmore
  },
  {
    path: 'inventory',
    component: InventoryComponent,
  },
  {
    path: 'chart-dashboard',
    component: ChartsDashboardComponent,
  },
  {
    path: 'menu',
    component: MenuCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
