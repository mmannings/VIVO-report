import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from "uuid"
import { Report } from 'src/app/reporting/models/report';
import { ReportService } from 'src/app/reporting/services/report.service';

@Component({
  selector: 'report-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  file_upload_config = {
    MIME_types_accepted: "application/pdf",
    is_multiple_selection_allowed: true,
  }

  templateForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
              private reportService: ReportService,
              private router: Router,
              private activeRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.templateForm = this.formBuilder.group({
      name: [''],
      format: [''],
      modelName: [''],
      constructQuery: ['']
    })
  }

  
  initializeReport(report: Report) {

    report.id = uuidv4();
  }
  

}
