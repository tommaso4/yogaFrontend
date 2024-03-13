import { ScrollSvcService } from './../../services/scroll-svc.service';
import { Component, OnInit } from '@angular/core';
import { AsanaSvcService } from '../../services/asana-svc.service';
import { IAsana } from '../../modules/IAsana';

@Component({
  selector: 'app-aside-bar',
  templateUrl: './aside-bar.component.html',
  styleUrl: './aside-bar.component.scss'
})
export class AsideBarComponent implements OnInit {
  allAsana!: IAsana[] | undefined;
  isOpen: boolean = false;

  constructor(
    private asanaSvc: AsanaSvcService,
    private scrollSvc: ScrollSvcService
  ) { }

  ngOnInit(): void {
    this.asanaSvc.allAsana$.subscribe(data => {
      this.allAsana = data;
    })
    this.scrollSvc.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;

    })
    this.setHeightOnScroll()
  }

  close(): void {
    this.scrollSvc.setIsOpen(false);
  }

  setHeightOnScroll() {
    window.addEventListener('scroll', () => {
      const scrollPosition: number = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollPositionVh: number = parseInt((scrollPosition / (window.innerHeight / 100)).toFixed())
      const asideBar = document.getElementById('aside-bar')
      if (asideBar)
        if (scrollPositionVh >= 0 && scrollPositionVh <= 12) {
          let heightOnScroll = (68 + scrollPositionVh).toString();
          asideBar.style.height = `${heightOnScroll}vh`;
        } else if (scrollPositionVh >= 12) {
          asideBar.style.height = `80vh`;
        }
    })
  }
}
