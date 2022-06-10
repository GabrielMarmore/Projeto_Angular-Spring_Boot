import { StorageService } from './../../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands = null;
  error = {message: ''};


  c_id= '';
  c_name = '';
  


  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  site = 'https://protected-fortress-44116.herokuapp.com';

  getList() {
    this.http.get<any>(this.site + '/api/v1/brands', {
      headers: { Authorization: 'Bearer ' + this.storage.getData('auth').token }
    })      .subscribe((data) => {
      this.brands= data;
    });
  }

  deleteBrand(brandId: number){
    console.log(this.storage.getData('auth'));
      this.http.delete(this.site + '/api/v1/brands/' + brandId, {
        headers: { Authorization: 'Bearer ' + this.storage.getData('auth').token }
      })
      .subscribe(res => {
      }, (error) => {
        this.error = error;
        console.log(error);
      });
  }

  changeBrandDiv(){
    document.querySelectorAll<HTMLElement>('#divBrandsForms > div').forEach((el) => {
      if (el.style.display != 'none') {
        el.style.display = 'none';
      } else {
        el.style.display = 'block';
      }

      this.getList();
    });
  }

  createBrand(){
    return this.http.post<any>(this.site + '/api/v1/brands', {
      name: this.c_name,
    }, {
      headers: { Authorization: 'Bearer ' + this.storage.getData('auth').token }
    }).subscribe(res => {
      alert('Sucesso');
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.getList();
  }

}
