import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AllRidesComponent } from './all-rides/allRides.component';
import { BookRideComponent } from './book-ride/bookRide.component';
import { CreateDriversComponent } from './createDrivers/drivers-create';
import { AllDriversComponent } from './all-drivers/allDrivers.component';
import { DriverDashboardComponent } from './driverDashboard/driverDashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'allRides', component: AllRidesComponent},
  { path: 'bookRide', component: BookRideComponent},
  { path: 'addDrivers', component:CreateDriversComponent},
  { path: 'viewDrivers', component: AllDriversComponent},
  { path: 'driverDashboard', component: DriverDashboardComponent},
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
