import { StorageService } from './../../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updatebudget',
  templateUrl: './updatebudget.component.html',
  styleUrls: ['./updatebudget.component.css']
})
export class UpdatebudgetComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private storage: StorageService
  ) {}
  error = {message: ''};
    
  site =  'https://secret-harbor-56343.herokuapp.com'; 

  budget = {id: '', user: '', part: ''};

  getBudget(i: any) {
    this.http
      .get<any>(this.site + '/api/v1/budgets', {
        headers: {
          Authorization: 'Bearer ' + this.storage.getData('auth').token,
        },
      })
      .subscribe((data) => {
        this.budget = data[i];
        console.log(this.budget);
      });
  }

  updateBudget(){
    this.http
    .put<any>(this.site + '/api/v1/budgets/' + this.budget.id,         {
      id: this.budget.id,
      user: this.budget.user,
      part: this.budget.part
    },
    {
      headers: {
        Authorization: 'Bearer ' + this.storage.getData('auth').token,
      },
    })
    .subscribe((data) => {
      console.log(data);
    }, (error) => {
      this.error = error;
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.getBudget(params.get('index'));
    });
  }
}
