import { VoiceService } from 'app/services/voice.service';
import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private voiceService: VoiceService) { }

  ngOnInit() {
    Observable.fromEvent(document.getElementsByTagName('body'), 'keyup')
      .filter($event => $event['key'] == 'q')
      .subscribe($event => {
        this.voiceService.cancelVoice();
      });

  }
}
