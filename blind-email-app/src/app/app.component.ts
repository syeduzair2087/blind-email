import { VoiceService } from 'app/services/voice.service';
import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private voiceService: VoiceService, private router: Router) { }

  ngOnInit() {
    if(!window['webkitSpeechRecognition']) {
      this.router.navigate(['error']);
      // this.voiceService.speak('Sorry, your browswer does not support speech recognition. The system will now exit.', 'female', null, (() => {
      //   window.close();
      // }).bind(this))
    }

    Observable.fromEvent(document.getElementsByTagName('body'), 'keyup')
      .filter($event => $event['key'] == 'q')
      .subscribe($event => {
        this.voiceService.cancelVoice();
      });
  }
}
