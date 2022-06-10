import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  auth = this.storage.getData('auth');
  users = null;
  error = { message: '' };

  //var create user
  c_username = '';
  c_password = '';
  c_email = '';
  c_telefone = '';
  c_name = '';
  c_userType = 2;

  constructor(private http: HttpClient, private storage: StorageService, private route: Router) {}

  
  site = 'https://secret-harbor-56343.herokuapp.com';

  getList() {
    if (this.storage.getData('auth').profile[0] == 'ADMIN') {
      this.http
        .get<any>(this.site + '/api/v1/users', {
          headers: {
            Authorization: 'Bearer ' + this.storage.getData('auth').token,
          },
        })
        .subscribe((data) => {
          this.users = data;
          console.log(data);
        });
    } else {
      this.route.navigate(['parts']);
    }
  }

  deleteUser(userId: number) {
    this.http
      .delete(this.site + '/api/v1/users/' + userId, {
        headers: {
          Authorization: 'Bearer ' + this.storage.getData('auth').token,
        },
      })
      .subscribe(
        (res) => {},
        (error) => {
          this.error = error;
          console.log(error);
        }
      );
  }

  changeDiv() {
    document
      .querySelectorAll<HTMLElement>('#divUsersForms > div')
      .forEach((el) => {
        if (el.style.display != 'none') {
          el.style.display = 'none';
        } else {
          el.style.display = 'block';
        }

        this.getList();
      });
  }

  createUser() {
    return this.http
      .post<User>(this.site + '/api/v1/users', {
        name: this.c_name,
        email: this.c_email,
        phone: this.c_telefone,
        url: '',
        profiles: [this.c_userType],
        login: this.c_username,
        password: this.c_password,
      })
      .subscribe(
        (res) => {
          alert('Sucesso');
        },
        (error) => {
          this.error = error;
          console.log(error);
        }
      );
  }

  getUserType(userType: any) {
    return userType == 1 ? 'Administrador' : 'Cliente';
  }
  ngOnInit(): void {
    this.getList();
  }
}
