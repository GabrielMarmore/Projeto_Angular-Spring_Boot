import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  parts = null;
  error = {message: ''};

  c_name = '';
  c_marca = '';
  c_preco= '';


  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  site = 'https://protected-fortress-44116.herokuapp.com';

  getList() {
    this.http.get<any>(this.site + '/api/v1/parts', {
      headers: { Authorization: 'Bearer ' + this.storage.getData('auth').token }
    }).subscribe((data) => {
      this.parts= data;
    });
  }

  deletePart(partId: number){
    console.log(this.storage.getData('auth'));
      this.http.delete(this.site + '/api/v1/parts/' + partId, {
        headers: { Authorization: 'Bearer ' + this.storage.getData('auth').token }
      })
      .subscribe(res => {
      }, (error) => {
        this.error = error;
        console.log(error);
      });
  }

  changePartDiv(){
    document.querySelectorAll<HTMLElement>('#divPartsForms > div').forEach((el) => {
      if (el.style.display != 'none') {
        el.style.display = 'none';
      } else {
        el.style.display = 'block';
      }

      this.getList();
    });
  }

  createPart(){
    return this.http.post<any>(this.site + '/api/v1/parts', {
      name: this.c_name,
      marca: this.c_marca,
      preco: this.c_preco,
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
