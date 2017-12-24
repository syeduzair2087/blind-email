import { Component, OnInit } from '@angular/core';
import { VoiceService } from 'app/services/voice.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private voiceService: VoiceService, private activatedRouteSnapshot:ActivatedRouteSnapshot) { }

  ngOnInit() {
    if(this.activatedRouteSnapshot.queryParams.error)
    this.voiceService.speak('Mic not found.', 'female', null, null);
    else
    this.voiceService.speak('Sorry, your browser does not support speech recognition.', 'female', null, null);
  }

}
