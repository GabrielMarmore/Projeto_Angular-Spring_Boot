import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private storage: StorageService, private router: Router) { }
  username = this.storage.getData('auth').username;
  userType = this.storage.getData('auth').profile[0];

  postLogout() {
    this.storage.clear();
  }

  getUserType(){
    return (this.userType == 'ADMIN')? "Administrador": "Cliente";
  }

  ngOnInit(): void {
  }

}
