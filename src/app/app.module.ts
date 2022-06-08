import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { MensagemModule } from './mensagem/mensagem.module';
import { StorageService } from './services/storage.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MensagemModule,
    LoginModule,
    HomeModule,
    MatCheckboxModule
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
