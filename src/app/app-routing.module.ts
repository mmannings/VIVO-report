import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './reporting/home';

const reportModule = () => import('./reporting/reporting.module').then(x => x.ReportingModule)
const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'reports',
    loadChildren: reportModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
