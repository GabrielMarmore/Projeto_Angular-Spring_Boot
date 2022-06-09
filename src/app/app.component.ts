import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MLW Store';

  constructor(private storage: StorageService, private router: Router) {}
  auth = this.storage.getData('auth');

  isEmpty(obj: any) {
    this.auth = this.storage.getData('auth');
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop) || obj.prop != '' || obj.prop != undefined)
        return false;
    }
    return true;
  }
}
