import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private storage: StorageService,
  ) {}

  site = 'https://protected-fortress-44116.herokuapp.com';
  budgets = null;

  getList() {
    this.http.get<any>(this.site + '/api/v1/budgets', {
      headers: { Authorization: 'Bearer ' + this.storage.getData('auth').token }
    })      .subscribe((data) => {
      this.budgets = data;
    });
  }

  ngOnInit(): void {
    this.getList();
  }

}
