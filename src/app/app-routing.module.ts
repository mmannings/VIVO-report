import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './reporting/home';
import { GraphComponent, ReportComponent, SelectComponent } from './reporting/components';
import { GraphAddEditComponent } from './reporting/components/graph/graph.add-edit';
import { SelectAddEditComponent } from './reporting/components/select/select.add-edit';

const reportModule = () => import('./reporting/reporting.module').then(x => x.ReportingModule)
const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'report',
    loadChildren: reportModule
  },

  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
