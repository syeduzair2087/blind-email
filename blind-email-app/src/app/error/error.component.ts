import { Component, OnInit } from '@angular/core';
import { VoiceService } from 'app/services/voice.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private voiceService: VoiceService) { }

  ngOnInit() {
    this.voiceService.speak('Sorry, your browser does not support speech recognition.', 'female', null, null);
  }

}
