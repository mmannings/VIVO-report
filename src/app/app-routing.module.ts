import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home-component';
import { ReportFormComponent } from './reporting/report-form/report-form.component';

const reportModule = () => import('./reporting/reporting.module').then(x => x.ReportingModule)
const routes: Routes = [
  {
    path: 'subsets',
    component: ReportFormComponent
  },
  {
    path: 'subsets',
    loadChildren: reportModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
