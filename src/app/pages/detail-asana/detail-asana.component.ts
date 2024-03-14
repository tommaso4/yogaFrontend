import { IAsana } from './../../modules/IAsana';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsanaSvcService } from '../../services/asana-svc.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-asana',
  templateUrl: './detail-asana.component.html',
  styleUrl: './detail-asana.component.scss'
})
export class DetailAsanaComponent implements OnInit, OnDestroy {

  idAsana!: string | null;
  allAsana!: IAsana[] | undefined;
  singleAsana!: IAsana | undefined;
  subActiveRoute!: Subscription;
  subAsaSvc!: Subscription;


  constructor(
    private activatedroute: ActivatedRoute,
    private asanaSvc: AsanaSvcService,
  ) { }

  ngOnInit(): void {
    this.subActiveRoute = this.activatedroute.paramMap.subscribe((data) => {
      this.idAsana = data.get('id');
      this.upDateSingleAsana()
    })
    this.subAsaSvc = this.asanaSvc.allAsana$.subscribe(allAsana => {
      this.allAsana = allAsana
      this.upDateSingleAsana()
    })
  }

  ngOnDestroy(): void {
    this.subActiveRoute.unsubscribe();
    this.subAsaSvc.unsubscribe();
  }

  upDateSingleAsana(): void {
    this.singleAsana = this.allAsana?.find(asa => asa.id === parseInt(this.idAsana || '', 10));
  }
}
