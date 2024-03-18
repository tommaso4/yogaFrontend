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

  constructor(
    private asanaSvc: AsanaSvcService
  ) { }

  ngOnInit(): void {
    this.subSliderAsa = this.asanaSvc.getAllAsana().pipe().subscribe(data => {
      this.allAsana = data.response
    })
  }

  ngOnDestroy(): void {
    this.subSliderAsa.unsubscribe();
    this.stop();
  }

  nextSlide() {
    if (this.courrentIndex >= 41) {
      this.courrentIndex = 0;
    } else this.courrentIndex++;
  }

  prevSlide() {
    if (this.courrentIndex === 0) {
      this.courrentIndex = 41
    } else this.courrentIndex--;
  }

  play() {
    if (this.selectedValue != undefined) {
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
}

// this.asanaSvc.allAsana$.subscribe(asana => {
//   this.allAsana = asana
//   this.allAsana?.sort((a, b) => (a.id - b.id))
// })

