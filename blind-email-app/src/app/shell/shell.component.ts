import { VoiceService } from './../services/voice.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  voiceInput() {
    this.voiceService.listen()
      .then((result: string) => {
        console.log(result);
        if (this.voiceService.keywordMatch(result, 'logout')) {
          this.voiceService.speak('Logging out', 'female', null, () => {
            this.authService.logout().subscribe(response => {
              console.log(response);
              this.router.navigate(['login']);
            });
          });
        } else if (this.voiceService.keywordMatch(result, 'repeat')) {
          this.playMenu();
          return;
        } else {
          this.voiceService.speak('Sorry, i was not able to get that. Please try again!', 'female', null, this.voiceInput.bind(this));
          return;
        }
      })
  }

  playIntro() {
    let intro = 'You have successfully logged in. Please use the menu to navigate. Speak one of the following options.'
    this.voiceService.speak(intro, 'female', null, this.playMenu.bind(this));
  }

  playMenu() {
    let menu = 'Check mail, to check your email. Send mail, to send email. Logout, to logout of the system. Or repeat, to repeat the menu.'
    this.voiceService.speak(menu, 'female', null, () => setTimeout(() => {
      this.voiceInput.call(this);
    }, 250));
  }

  constructor(private voiceService: VoiceService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.playIntro();
  }

  clickLogout() {
  }
}
