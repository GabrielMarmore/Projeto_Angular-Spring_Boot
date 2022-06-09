import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserComponent } from './user/user.component';
import { PartComponent } from './part/part.component';
import { BrandComponent } from './brand/brand.component';
import { BudgetComponent } from './budget/budget.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    HomeComponent,
    UserComponent,
    PartComponent,
    BrandComponent,
    BudgetComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatCardModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
