import { VoiceService } from 'app/services/voice.service';
import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private voiceService: VoiceService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if(!window['webkitSpeechRecognition']) {
      navigator.mediaDevices.getUserMedia({audio: true})
      .then(() => this.router.navigate(['error']))
      .catch(error => {
        console.log(error)
       if(error.name ==='NO_DEVICES_FOUND')
       this.router.navigate(['error', {error: 'Mic not found'}]); 
       else
       this.router.navigate(['error', {error: error.messsage}]); 
      })

      // navigator.getUserMedia({audio: true},()=> {
      //   this.router.navigate(['error']);
      // }, (error)=> {
      //   console.log(error)
      //   if (error.name === 'NO_DEVICES_FOUND') 
      //   this.router.navigate(['error']);
      // })
      
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
