import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './reporting/home/home.component';
import { ListComponent } from './reporting/list';
import { GraphComponent, ReportComponent, SelectComponent } from './reporting/components';
import { GraphAddEditComponent } from './reporting/components/graph/graph.add-edit';
import { SelectAddEditComponent } from './reporting/components/select/select.add-edit';

const reportModule = () => import('./reporting/reporting.module').then(x => x.ReportingModule)
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'add', loadChildren: reportModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
