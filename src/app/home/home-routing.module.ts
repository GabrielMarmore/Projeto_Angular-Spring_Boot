import { UpdatebudgetComponent } from './updatebudget/updatebudget.component';
import { UpdatepartComponent } from './updatepart/updatepart.component';
import { UpdatebrandComponent } from './updatebrand/updatebrand.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UdpateComponent } from './udpate/udpate.component';
import { BudgetComponent } from './budget/budget.component';
import { BrandComponent } from './brand/brand.component';
import { PartComponent } from './part/part.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UserComponent},
  {path: 'parts', component: PartComponent},
  {path: 'brands', component: BrandComponent},
  {path: 'budgets', component: BudgetComponent},
  {path: 'users/update/:index', component: UdpateComponent},
  {path: 'home/update/:index', component: UdpateComponent},
  {path: 'brands/update/:index', component: UpdatebrandComponent},
  {path: 'home/update/:index', component: UpdatebrandComponent},
  {path: 'parts/update/:index', component: UpdatepartComponent},
  {path: 'home/update/:index', component: UpdatepartComponent},
  {path: 'budgets/update/:index', component: UpdatebudgetComponent},
  {path: 'home/update/:index', component: UpdatebudgetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
