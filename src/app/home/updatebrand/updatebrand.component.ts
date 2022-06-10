import { StorageService } from './../../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updatebrand',
  templateUrl: './updatebrand.component.html',
  styleUrls: ['./updatebrand.component.css']
})
export class UpdatebrandComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private storage: StorageService
  ) {}
  error = {message: ''};
  site = 'https://protected-fortress-44116.herokuapp.com';

  brand = {id: '', name: ''};

  getBrand(i: any) {
    this.http
      .get<any>(this.site + '/api/v1/brands', {
        headers: {
          Authorization: 'Bearer ' + this.storage.getData('auth').token,
        },
      })
      .subscribe((data) => {
        this.brand = data[i];
        console.log(this.brand);
      });
  }

  updateBrand(){
    this.http
    .put<any>(this.site + '/api/v1/brands/' + this.brand.id,         {
      id: this.brand.id,
      name: this.brand.id
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
      this.getBrand(params.get('index'));
    });
  }
}
