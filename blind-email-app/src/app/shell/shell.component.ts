import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Observable } from 'rxjs/Rx';
import { VoiceService } from './../services/voice.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailService } from 'app/services/email.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  speaking: boolean = true;
  listening: boolean = false;

  emailMenuInput(emails) {
    console.log('==========================================')
    console.log(emails)
    console.log('==========================================')
    this.toggleListen(true);
    this.voiceService.listen()
      .then((result: string) => {
        this.toggleListen(false);
        console.log(result);
        if (this.voiceService.keywordMatch(result, 'number')) {
          if ('parts' in emails.messages[parseInt(result) - 1].payload) {
            let mail = this.emailService.decodeEmail((emails.messages[parseInt(result) - 1]).payload.parts[0].body.data);
            this.toggleSpeak(true);
            this.voiceService.speak(mail, 'female', null, () => {
              return this.voiceService.speak('I have finished reading your email. Please speak another number, or more, to fetch more emails', 'female', null, () => {
                this.toggleSpeak(false);
                this.emailMenuInput(emails)
              });
            });
          } else {
            let mail = this.emailService.decodeEmail((emails.messages[parseInt(result) - 1]).payload.body.data);
            this.toggleSpeak(true);
            this.voiceService.speak(mail, 'female', null, () => {
              return this.voiceService.speak('I have finished reading your email. Please speak another number, or more, to fetch more emails', 'female', null, () => {
                this.toggleSpeak(false);
                this.emailMenuInput(emails)
              });
            });
          }
          console.log('Email', this.emailService.decodeEmail((emails.messages[parseInt(result) - 1]).payload.parts[0].body.data))
        } else if (this.voiceService.keywordMatch(result, 'return')) {
          return (() => {
            this.toggleSpeak(true);
            this.voiceService.speak('Returning to previous menu.', 'female', null, () => {
              this.toggleSpeak(false);
              this.playMenu()
            });
          })()
        } else if (this.voiceService.keywordMatch(result, 'more')) {
          return (() => {
            this.toggleSpeak(true);
            this.voiceService.speak('Fetching more emails.', 'female', null, () => {
              this.toggleSpeak(false);
              this.emailService.fetchEmail(emails.nextPageToken)
                .subscribe((result: any) => {
                  console.log(result);
                  this.emailMenu(result.data);
                })
            });
          })()
        } else {
          this.toggleSpeak(true);
          this.voiceService.speak('Sorry, i was not able to get that, please try again!', 'female', null, () => {
            return (() => {
              this.toggleSpeak(false);
              this.emailMenuInput(emails)
            })();
          })
        }
      });
  }

  emailMenu(emails) {
    this.toggleSpeak(true);
    this.voiceService.speak('Your emails have been fetched. Please speak a number between 1 and 10, or more, to fetch more emails', 'female', null, () => {
      this.voiceService.speak('Speak return, to return to previous menu', 'female', null, () => {
        this.toggleSpeak(false);
        this.emailMenuInput(emails);
      })
    })
  }

  voiceInput() {
    this.toggleListen(true);
    this.voiceService.listen()
      .then((result: string) => {
        this.toggleListen(false);
        console.log(result);
        if (this.voiceService.keywordMatch(result, 'logout')) {
          this.toggleSpeak(true);
          this.voiceService.speak('Logging out', 'female', null, () => {
            this.toggleSpeak(false);
            this.authService.logout().subscribe(response => {
              console.log(response);
              this.router.navigate(['login']);
            });
          });
        } else if (this.voiceService.keywordMatch(result, 'repeat')) {
          return this.playMenu();
        } else if (this.voiceService.keywordMatch(result, 'fetchMail')) {
          this.toggleSpeak(true);
          this.voiceService.speak('Fetching emails. Please wait.', 'female', null, () => {
            this.toggleSpeak(false);
            return this.emailService.fetchEmail()
              .subscribe((result: any) => {
                console.log(result);
                this.emailMenu(result.data);
              })
          })
          return;
        } else if (this.voiceService.keywordMatch(result, 'send')) {

          this.inputEmailAddress();

        } else {
          this.toggleSpeak(true);
          this.voiceService.speak('Sorry, i was not able to get that. Please try again!', 'female', null, () => {
            this.toggleSpeak(false);
            this.voiceInput();
          });
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
    this.toggleSpeak(true);
    this.voiceService.speak(menu, 'female', null, () => {
      this.toggleSpeak(false);
      this.voiceInput();
    })
  }

  inputEmailAddress() {
    this.toggleSpeak(true);
    this.voiceService.speak('Please speak the email address of the recipient.', 'female', null, () => {
      this.toggleSpeak(false);
      this.toggleListen(true);
      this.voiceService.listen()
        .then((emailAddress: string) => {
          this.toggleListen(false);
          let _emailAddress = emailAddress.replace(/\s+/g, '').toLocaleLowerCase();
          console.log(_emailAddress);
          let emailRegex = /\S+@\S+\.\S+/;
          if (!emailRegex.test(_emailAddress)) {
            return (() => {
              this.toggleSpeak(true);
              this.voiceService.speak('Sorry, please provide a valid email address.', 'female', null, () => {
                this.toggleSpeak(false);
                this.inputEmailAddress();
              })
            })()
          } else {
            this.inputEmailSubject(_emailAddress);
          }
        });
    })
  }

  inputEmailSubject(emailAddress: string) {
    this.toggleSpeak(true);
    this.voiceService.speak('Please speak the subject of the email.', 'female', null, () => {
      this.toggleSpeak(false);
      this.voiceService.listen()
        .then((subject: string) => {
          console.log(subject);
          if (subject.trim() === '') {
            return (() => {
              this.toggleSpeak(true);
              this.voiceService.speak('Sorry, please provide a valid subject.', 'female', null, () => {
                this.toggleSpeak(false);
                this.inputEmailSubject(emailAddress);
              })
            })()
          } else {
            this.inputEmailBody(emailAddress, subject);
          }
        });
    })
  }

  inputEmailBody(emailAddress, subject) {
    this.toggleSpeak(true);
    this.voiceService.speak('Please speak the message.', 'female', null, () => {
      this.toggleSpeak(false);
      this.voiceService.listen()
        .then((message: string) => {
          console.log(message)
          if (message.trim() === '') {
            return (() => {
              this.toggleSpeak(true);
              this.voiceService.speak('Sorry, please provide a email body.', 'female', null, () => {
                this.toggleSpeak(false);
                this.inputEmailBody(emailAddress, subject);
              })
            })()
          } else {
            this.sendEmail(emailAddress, subject, message);
          }
        });
    })
  }

  sendEmail(emailAddress: string, subject: string, body: string) {
    let mail = {
      emailAddress, subject, body
    };
    console.log(mail);
    this.toggleSpeak(true);
    this.voiceService.speak('Are you sure you want to send the email?', 'female', null, () => {
      this.toggleSpeak(false);
      this.toggleListen(true);
      this.voiceService.listen()
        .then((result: string) => {
          this.toggleListen(false);
          if (this.voiceService.keywordMatch(result, 'yes')) {
            console.log('yes');
            return (() => {
              this.emailService.sendEmail(emailAddress, subject, body)
                .subscribe(result => {
                  console.log(result);
                  this.toggleSpeak(true);
                  this.voiceService.speak('Your email has been sent successfully!', 'female', null, () => {
                    this.toggleSpeak(false);
                    this.playMenu();
                  })
                })
            })()
          } else if (this.voiceService.keywordMatch(result, 'no')) {

          } else {
            return (() => {
              this.voiceService.speak('Sorry i was not able to get that, please try again!', 'female', null, () => {
                this.sendEmail(emailAddress, subject, body);
              })
            })()
          }
        })
    })
  }

  constructor(private voiceService: VoiceService, private authService: AuthService, private router: Router, private emailService: EmailService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.playIntro();
  }

  clickLogout() {
  }

  toggleSpeak(toggle: boolean) {
    this.speaking = toggle;
    this.changeDetector.detectChanges();
  }

  toggleListen(toggle: boolean) {
    this.listening = toggle;
    this.changeDetector.detectChanges();
  }
}
