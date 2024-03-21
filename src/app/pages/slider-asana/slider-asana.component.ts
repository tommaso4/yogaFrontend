import { Subscription } from 'rxjs';
import { IAsana } from '../../modules/IAsana';
import { AsanaSvcService } from './../../services/asana-svc.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-asana',
  templateUrl: './slider-asana.component.html',
  styleUrl: './slider-asana.component.scss'
})
export class SliderAsanaComponent implements OnInit, OnDestroy {

  allAsana!: IAsana[] | undefined;
  courrentIndex: number = 0;
  isPlaying: boolean = false;
  selectedValue: string | undefined = undefined;
  playingIntervall!: any;
  subSliderAsa!: Subscription;
  synth = window.speechSynthesis;

  constructor(
    private asanaSvc: AsanaSvcService
  ) { }

  ngOnInit(): void {
      this.subSliderAsa =  this.asanaSvc.allAsana$.subscribe(asana => {
      this.allAsana = asana
    })
}

  ngOnDestroy(): void {
    if(this.subSliderAsa)this.subSliderAsa.unsubscribe();
    this.stop();
  }

  nextSlide() {
    if (this.courrentIndex >= 41) {
      this.courrentIndex = 0;
    } else {
      this.courrentIndex++;
      this.speakAsanaName()
    }
  }

  prevSlide() {
    if (this.courrentIndex === 0) {
      this.courrentIndex = 41
    } else {
      this.courrentIndex--;
      this.speakAsanaName()
    }
  }

  play() {
    if (this.selectedValue != undefined) {
      this.speakAsanaName()
      this.isPlaying = true;
      this.playingIntervall = setInterval(() => {
        this.nextSlide();
      }, parseInt(this.selectedValue) * 1000)
    }
  }

  stop() {
    this.isPlaying = false;
    clearInterval(this.playingIntervall)
  }

  resetSlider() {
    this.courrentIndex = 0;
    this.selectedValue = undefined;
    this.stop()
  }

  speakAsanaName() {
    if (this.allAsana && this.allAsana[this.courrentIndex]) {
      const asanaName = this.allAsana[this.courrentIndex].name;
      const synth = window.speechSynthesis;
      let voices = synth.getVoices()
      const utterance = new SpeechSynthesisUtterance(asanaName);
      utterance.pitch = 0;
      utterance.voice = voices[87]
      synth.speak(utterance);
    }
  }
}


