import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFormComponent } from './report-form/report-form.component';

import { MaterialModule } from '../material.module';
import { SubsetFormComponent } from './report-form/subset-form/subset-form.component';
import { AddEditFromComponent } from './report-form/subset-form/subsets/add-edit-from-content';
import { CriteriaFormComponent } from './report-form/criteria-form/criteria-form.component';
import { TemplateFormComponent } from './report-form/template-form/template-form.component';
import { ExportFormComponent } from './report-form/export-form/export-form.component';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { SubsetsRoutingModule } from './reporting-routing.module';

@NgModule({
  declarations: [
    ReportFormComponent,
    SubsetFormComponent,
    AddEditFromComponent,
    CriteriaFormComponent,
    TemplateFormComponent,
    ExportFormComponent
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
