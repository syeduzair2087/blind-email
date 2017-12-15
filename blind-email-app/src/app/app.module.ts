import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginModule } from 'app/login/login.module';
import { ShellModule } from 'app/shell/shell.module';
import { LoginGuard, HomeGuard } from 'app/services/guard.service';
import { CookieModule } from 'ngx-cookie';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    ShellModule,
    AppRoutingModule,
    CookieModule.forRoot()
  ],
  providers: [LoginGuard, HomeGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
