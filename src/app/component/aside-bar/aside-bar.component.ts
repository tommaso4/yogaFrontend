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
    this.scrollSvc.setHeightAsideOnScroll()
  }

  close(): void {
    this.scrollSvc.setIsOpen(false);
  }


}
