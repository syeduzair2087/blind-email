import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { VoiceService } from 'app/services/voice.service';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = true;

  playIntro() {
    this.voiceService.speak('Welcome to blind email system, please login to continue. Click the button, or say login after the beep',
      'female',
      () => this.loading = false,
      () => setTimeout(() => {
        this.voiceInput.call(this);
      }, 250));
  }

  voiceInput() {
    this.voiceService.listen()
      .then((result: string) => {
        console.log(result);
        if (this.voiceService.keywordMatch(result, 'login')) {
          this.voiceService.speak('Logging in.');
          this.authService.login()
            .subscribe(result => window.location.assign(result.url))
        }
        else {
          this.voiceService.speak('Sorry, i was not able to get that. Please try again!', 'female', null, this.voiceInput.bind(this));
          return;
        }
      })
  }

  constructor(private voiceService: VoiceService, private authService: AuthService) { }

  ngOnInit() {
    this.playIntro();
  }

  clickLogin() {
    console.log('click')
    this.authService.login()
      .subscribe(result => window.location.assign(result.url))
  }
}
