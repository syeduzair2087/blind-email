import { VoiceService } from './../services/voice.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from 'app/shared/shared.module';
import { AuthService } from 'app/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [LoginComponent],
  providers: [
    VoiceService,
    AuthService
  ]
})
export class LoginModule { }
