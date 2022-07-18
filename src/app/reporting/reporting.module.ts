import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFormComponent } from './report-form/report-form.component';

import { MaterialModule } from '../material.module';
import { DatabaseFormComponent } from './report-form/database-form/database-form.component';
import { CriteriaFormComponent } from './report-form/criteria-form/criteria-form.component';
import { TemplateFormComponent } from './report-form/template-form/template-form.component';
import { ExportFormComponent } from './report-form/export-form/export-form.component';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReportFormComponent,
    DatabaseFormComponent,
    CriteriaFormComponent,
    TemplateFormComponent,
    ExportFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class ReportingModule { }
