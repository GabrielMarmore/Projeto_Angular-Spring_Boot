import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-udpate',
  templateUrl: './udpate.component.html',
  styleUrls: ['./udpate.component.css'],
})
export class UdpateComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private storage: StorageService
  ) {}
  error = {message: ''};
  site = 'https://protected-fortress-44116.herokuapp.com';

  user = {id: '', name: '', email: '', phone: '', login: ''};

  getUser(i: any) {
    this.http
      .get<any>(this.site + '/api/v1/users', {
        headers: {
          Authorization: 'Bearer ' + this.storage.getData('auth').token,
        },
      })
      .subscribe((data) => {
        this.user = data[i];
        console.log(this.user);
      });
  }

  updateUser(){
    this.http
    .put<any>(this.site + '/api/v1/users/' + this.user.id,         {
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      login: this.user.login,
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
      this.getUser(params.get('index'));
    });
  }
}
