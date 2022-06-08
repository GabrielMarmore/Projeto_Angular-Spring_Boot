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

  postLogout() {
    this.storage.clear();
    console.log(this.storage.getData('auth'));
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }

}
