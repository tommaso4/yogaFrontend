import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogSvcService } from '../../services/log-svc.service';
import { Router } from '@angular/router';
import { Subscription, catchError } from 'rxjs';
import { ManagementSvcService } from '../../services/management-svc.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  idUser!: string | null;
  userName!: string | null;
  role!: string | null;
  subDeleteUser!: Subscription;
  confirmDelete!: boolean;
  deletedUser: boolean = false;

  constructor(
    private router: Router,
    private managementSvc: ManagementSvcService,
    private logSvc: LogSvcService
  ) { }

  ngOnInit() {
    this.confirmDelete = false;
    this.idUser = localStorage.getItem('idUser');
    this.userName = localStorage.getItem('username');
    this.role = localStorage.getItem('role')
  }

  ngOnDestroy() {
    this.confirmDelete = false;
    if(this.subDeleteUser)this.subDeleteUser.unsubscribe();
  }
  deleteUser() {
    this.deletedUser = true;
    if (this.idUser)
      this.subDeleteUser =this.managementSvc.deleteUser(this.idUser).pipe(catchError(err => {
        throw err;
      })).subscribe(()=>{
        setTimeout(() => {
          this.deletedUser = false;
          this.logSvc.logOut()
          this.router.navigate(['/login'])
        }, 2000);
      })
  }
  changeConfirmDelete() {
    this.confirmDelete = !this.confirmDelete;
  }
}
