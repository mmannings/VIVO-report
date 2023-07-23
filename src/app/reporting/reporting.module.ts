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
import { HomeComponent } from './home/home.component';
import { ListComponent } from "./list";
import { GraphComponent, SelectComponent, ReportComponent } from './components/';
import { GraphAddEditComponent } from './components/graph/graph.add-edit';
import { SelectAddEditComponent } from './components/select/select.add-edit';
import { MaterialFileUploaderComponent } from '../material-file-uploader/material-file-uploader.component';
import { LayoutComponent } from './layout/layout.component';
import { ListGraphComponent } from './list-graph/list-graph.component';
import {DragAndDrop} from "../drag-and-drop/drag-and-drop";
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    ReportFormComponent,
    SubsetFormComponent,
    CriteriaFormComponent,
    TemplateFormComponent,
    ExportFormComponent,
    HomeComponent,
    ListComponent,
    GraphComponent,
    SelectComponent,
    ReportComponent,
    GraphAddEditComponent,
    SelectAddEditComponent,
    MaterialFileUploaderComponent,
    LayoutComponent,
    ListGraphComponent,
    DragAndDrop,
    SidenavComponent
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
