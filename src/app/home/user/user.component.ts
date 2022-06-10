import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  url: string;
  profiles: Array<string>;
  login: string;
  password: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  displayedColumns = ['name', 'email', 'cel'];
  users = null;
  error = {message: ''};

  //var create user
  c_username = '';
  c_password = '';
  c_email = '';
  c_telefone = '';
  c_name = '';
  c_userType = 2;

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  site = 'https://protected-fortress-44116.herokuapp.com';

  getList() {
    this.http.get<any>(this.site + '/api/v1/users', {
      headers: { Authorization: 'Bearer ' + this.storage.getData('auth').token }
    })      .subscribe((data) => {
      this.users= data;
    });
  }
  
  deleteUser(userId: number){
    console.log(this.storage.getData('auth'));
      this.http.delete(this.site + '/api/v1/users/' + userId, {
        headers: { Authorization: 'Bearer ' + this.storage.getData('auth').token }
      })
      .subscribe(res => {
      }, (error) => {
        this.error = error;
        console.log(error);
      });
  }

  changeDiv(){
    document.querySelectorAll<HTMLElement>('#divUsersForms > div').forEach((el) => {
      if (el.style.display != 'none') {
        el.style.display = 'none';
      } else {
        el.style.display = 'block';
      }

      this.getList();
    });
  }

  createUser(){
    return this.http.post<User>(this.site + '/api/v1/users', {
      name: this.c_name,
      email: this.c_email,
      phone: this.c_telefone,
      url: '',
      profiles: [this.c_userType],
      login: this.c_username,
      password: this.c_password,
    }).subscribe(res => {
      alert('Sucesso');
    }, (error) => {
      this.error = error;
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.getList();
  }

}
