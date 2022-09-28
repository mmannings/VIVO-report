import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFormComponent } from './report-form/report-form.component';

import { MaterialModule } from '../material.module';
import { SubsetFormComponent } from './report-form/add-report/subset-form/subset-form.component';
import { CriteriaFormComponent } from './report-form/add-report/criteria-form/criteria-form.component';
import { TemplateFormComponent } from './report-form/add-report/template-form/template-form.component';
import { ExportFormComponent } from './report-form/add-report/export-form/export-form.component';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { SubsetsRoutingModule } from './reporting-routing.module';
import { HomeComponent } from './home';

@NgModule({
  declarations: [
    ReportFormComponent,
    SubsetFormComponent,
    CriteriaFormComponent,
    TemplateFormComponent,
    ExportFormComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SubsetsRoutingModule
  ]
})
export class ReportingModule { }
