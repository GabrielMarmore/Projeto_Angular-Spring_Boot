import { StorageService } from './../../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updatepart',
  templateUrl: './updatepart.component.html',
  styleUrls: ['./updatepart.component.css']
})
export class UpdatepartComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private storage: StorageService
  ) {}
  error = {message: ''};
  site = 'https://protected-fortress-44116.herokuapp.com';

  part = {id: '', name: '', preco: '', marca: ''};

  getPart(i: any) {
    this.http
      .get<any>(this.site + '/api/v1/parts', {
        headers: {
          Authorization: 'Bearer ' + this.storage.getData('auth').token,
        },
      })
      .subscribe((data) => {
        this.part = data[i];
        console.log(this.part);
      });
  }

  updatePart(){
    this.http
    .put<any>(this.site + '/api/v1/brands/' + this.part.id,         {
      id: this.part.id,
      name: this.part.name,
      preco: this.part.preco,
      marca: this.part.marca
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
      this.getPart(params.get('index'));
    });
  }
}
