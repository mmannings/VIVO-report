import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CriteriaFormComponent } from './criteria-form/criteria-form.component';
import { DatabaseFormComponent } from './database-form/database-form.component';
import { ExportFormComponent } from './export-form/export-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';

const DATABASE_INDEX: number = 0;
const CRITERIA_INDEX: number = 1;
const TEMPLATE_INDEX: number = 2;
const EXPORT_INDEX: number = 3;

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit, AfterViewInit {
  currentStepIndex: number = 0;

  @ViewChild(DatabaseFormComponent)
  databaseComponent!: DatabaseFormComponent;
  @ViewChild(CriteriaFormComponent)
  criteriaComponent!: CriteriaFormComponent;
  @ViewChild(TemplateFormComponent) templateComponent!: TemplateFormComponent;
  @ViewChild(ExportFormComponent)
  exportComponent!: ExportFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log('databaseCo" ', this.databaseComponent)
  }


}
