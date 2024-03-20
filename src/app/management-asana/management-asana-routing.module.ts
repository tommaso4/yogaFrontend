import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementAsanaComponent } from './management-asana.component';
import { CreateAsanaComponent } from './create-asana/create-asana.component';
import { DeleteAsanaComponent } from './delete-asana/delete-asana.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'managementAsana' },
  {path: 'managementAsana', component: ManagementAsanaComponent,children:[
    {path: 'createAsana', component: CreateAsanaComponent},
    {path: 'deleteAsana', component: DeleteAsanaComponent},
    {path: 'deleteUser', component: DeleteAsanaComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementAsanaRoutingModule { }
