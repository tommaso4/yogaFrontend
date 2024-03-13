import { IAsana } from './../../modules/IAsana';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsanaSvcService } from '../../services/asana-svc.service';

@Component({
  selector: 'app-detail-asana',
  templateUrl: './detail-asana.component.html',
  styleUrl: './detail-asana.component.scss'
})
export class DetailAsanaComponent implements OnInit, OnDestroy {

  idAsana!: string |null;
  allAsana!: IAsana[]| undefined;
  singleAsana!:IAsana| undefined;


  constructor(
    private activatedroute: ActivatedRoute,
    private asanaSvc: AsanaSvcService
  ){}

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((data)=>{
      this.idAsana = data.get('id');
      this.singleAsana = this.allAsana?.find(asa => asa.id === parseInt(this.idAsana || '', 10));
      console.log(this.singleAsana);

    })
    this.asanaSvc.allAsana$.subscribe(allAsana=>{
      this.allAsana = allAsana
    })
    this.singleAsana = this.allAsana?.find(asa => asa.id === parseInt(this.idAsana || '', 10));
    console.log(this.singleAsana);



  }

  ngOnDestroy(): void {
    console.log('ngondestroy need to implement');
  }
}
