import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { AuthService } from 'app/services/auth.service';
import { VoiceService } from 'app/services/voice.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShellComponent],
  providers: [
    AuthService,
    VoiceService
  ]
})
export class ShellModule { }
