import { Component, OnInit } from '@angular/core';
import { Users } from './models/users';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: Users[] = [
    { _id: '1', name: 'Admin', email: 'admin@admin.com', cel: 99750008 }
  ];
  displayedColumns = ['name', 'email', 'cel'];

  constructor() {
    // this.users = [];
  }

  ngOnInit(): void {
  }

}
