import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { AuthService } from 'app/services/auth.service';
import { VoiceService } from 'app/services/voice.service';
import { EmailService } from 'app/services/email.service';
import { EntertainmentService } from 'app/services/entertainment.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShellComponent],
  providers: [
    AuthService,
    VoiceService,
    EmailService,
    EntertainmentService
  ]
})
export class ShellModule { }
