import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagementSvcService } from '../../services/management-svc.service';
import { GeneralMetodService } from '../../services/general-metod.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  form!: FormGroup;
  visibility: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private generalMetod: GeneralMetodService,
    private managementSvc: ManagementSvcService
  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(null, Validators.required)
    })
  }

  ngOnDestroy(): void {
    this.visibility = false;
  }

  deleteUser() {
    let idUser = localStorage.getItem('idUser');
    if (idUser)
      this.managementSvc.deleteUser(idUser).pipe().subscribe(() => {
        alert('User deleted successfully')
        this.visibility = false;
      })
  }

  isValidAnfTouched(nameForm: string): boolean | undefined {
    return this.generalMetod.isValidAndTouched(nameForm, this.form)
  }

  visibilityTrue() {
    localStorage.setItem('idUser', this.form.value.id)
    this.form.reset()
    this.visibility = true;
  }

  visibilityFalse() {
    localStorage.removeItem('idUser')
    this.visibility = false;
  }
}

