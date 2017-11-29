import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable()
export class VoiceService {
  voiceKeywords = {
    login : [
      'login', 'sign in', 'authenticate'
    ],
    logout: [
      'logout', 'log out', 'sign out'
    ],
    repeat: [
      'repeat', 'repeat menu'
    ]
  }


  constructor() { }

  keywordMatch(input: string, key: string) {
    return this.voiceKeywords[key].includes(input);
  }

  speak(text: string, voice: string = 'female', onload?: () => any, onend?: () => any) {
    let voiceInterval = setInterval(() => {
      let voices = window.speechSynthesis.getVoices();
      if (voices.length) {
        if (onload)
          onload();

        clearInterval(voiceInterval);

        let msg = new SpeechSynthesisUtterance(text);

        voice == 'male' ? msg.voice = voices[50] : msg.voice = voices[49];

        console.log('fn onend', onend);

        if (onend) {
          console.log('onend funciton found');
          msg.onend = onend;
        }

        console.log(msg.onend);
        window.speechSynthesis.speak(msg);
      }
    }, 250)
  }

  beep() {
    let beep = new Audio();
    beep.src = './assets/beep.mp3';
    beep.load();
    beep.play();
  }

  listen() {
    this.beep();
    return new Promise((resolve, reject) => {
      let input: string = '';
      let rec = new webkitSpeechRecognition();
  
      rec.onstart = () => {
        console.log('Listening...');
      }
  
      rec.onresult = e => {
        console.log('Found result');
        console.log(e);
        input = e.results[0][0].transcript;
      }
  
      rec.onend = e => {
        console.log('Listening end');
        console.log(e);
        resolve(input);
      }
  
      rec.start();
    })
  }
}
