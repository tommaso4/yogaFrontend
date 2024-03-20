import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementAsanaRoutingModule } from './management-asana-routing.module';
import { ManagementAsanaComponent } from './management-asana.component';
import { CreateAsanaComponent } from './create-asana/create-asana.component';
import { DeleteAsanaComponent } from './delete-asana/delete-asana.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManagementAsanaComponent,
    CreateAsanaComponent,
    DeleteAsanaComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule,
    ManagementAsanaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ManagementAsanaModule { }
