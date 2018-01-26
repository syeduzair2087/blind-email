import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var webkitSpeechRecognition: any;

@Injectable()
export class VoiceService {

  voiceKeywords = {
    login: [
      'login', 'sign in', 'authenticate'
    ],
    logout: [
      'logout', 'log out', 'sign out'
    ],
    repeat: [
      'repeat', 'repeat menu'
    ],
    fetchMail: [
      'fetch email', 'fetch mail', 'check email', 'check mail', 'get mail', 'get email', 'email'
    ],
    number: [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
    ],
    return: [
      'return', 'back', 'go back'
    ],
    more: [
      'more', 'more email', 'more mail', 'fetch more'
    ],
    send: [
      'send', 'send mail', 'send email', 'send message', 'write', 'write email', 'write mail'
    ],
    yes: [
      'yes', 'sure', 'confirm', 'positive'
    ], 
    no: [
      'no', 'negative', 'not sure'
    ],
    magazine: [
      'read magazine', 'magazine'
    ],
    song: [
      'song', 'play song', 'sing', 'sing a song', 'play', 'music', 'play music'
    ],
    reply: [
      'reply', 'send reply'
    ],
    forward: [
      'forward', 'forward mail'
    ]
  }


  constructor() { }

  keywordMatch(input: string, key: string) {
    return this.voiceKeywords[key].includes(input);
  }

  // getNumberIndex(number: string) {
  //   return this.voiceKeywords.number.indexOf(number);
  // }

  speak(text: string, voice: string = 'female', onload?: () => any, onend?: () => any) {
    let msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1.1;
    msg.pitch = 1.2;
    // let voiceInterval = setInterval(() => {
    // let voices = window.speechSynthesis.getVoices();
    // if (voices.length) {
    // if (onload) {
    //   console.log('fn onload', onload);
    //   onload();
    // }

    // clearInterval(voiceInterval);

    // let msg = new SpeechSynthesisUtterance(text);


    // voice == 'male' ? msg.voice = voices[50] : msg.voice = voices[49];


    if (onend) {
      console.log('fn onend', onend);
      msg.onend = onend;
    }

    // console.log(msg.onend);
    // msg.rate = 2.0;

    window.speechSynthesis.speak(msg);
    // }
    // }, 250)
  }

  beep() {
    let beep = new Audio();
    beep.src = './assets/beep.mp3';
    beep.load();
    beep.play();
  }

  listen(uninterrupted?: boolean) {
    this.beep();
    return new Promise((resolve, reject) => {
      let input: string = '';
      let rec = new webkitSpeechRecognition();

      if(uninterrupted) {
        rec.continuous = true;

        Observable.fromEvent(document.getElementsByTagName('body'), 'keyup')
        .filter($event => $event['key'] == 'w')
        .first()
        .subscribe($event => {
          rec.stop();
        });
      }

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

  cancelVoice() {
    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  }
}
