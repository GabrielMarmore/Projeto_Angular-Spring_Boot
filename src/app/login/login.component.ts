import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

interface Auth {
  token: string;
  username: string;
  profile: Array<string>;
}

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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) {}
  site = 'https://protected-fortress-44116.herokuapp.com';

  username = '';
  password = '';
  c_username = '';
  c_password = '';
  c_email = '';
  c_telefone = '';
  c_name = '';

  postLogin(username: string, password: string): Observable<any> {
    return this.http.post<Auth>(this.site + '/login', {
      login: username,
      password: password,
    });
  }

  changeForms() {
    document.querySelectorAll<HTMLElement>('#divForms > div').forEach((el) => {
      if (el.style.display != 'none') {
        el.style.display = 'none';
      } else {
        el.style.display = 'block';
      }
    });
  }

  login() {
    this.postLogin(this.username, this.password).subscribe(
      (data) => {
        this.storage.setData('auth', data);
      },
      (error) => {
        alert('Usuário ou senha inválidos');
        console.log(error);
      }
    );
  }

  createUser(): Observable<any> {
    return this.http.post<User>(this.site + '/api/v1/users', {
      name: this.c_name,
      email: this.c_email,
      phone: this.c_telefone,
      url: '',
      profiles: [2],
      login: this.c_username,
      password: this.c_password,
    });
  }

  createUser_login() {
    this.createUser().subscribe((data) => {
      console.log(data);
      this.postLogin(data.login, this.c_password).subscribe((dataAuth) => {
        this.storage.setData('auth', dataAuth);
        console.log(this.storage.getData('auth'));
      });
    });
  }

  ngOnInit(): void {
    this.storage.setData('auth', {});
  }
}
