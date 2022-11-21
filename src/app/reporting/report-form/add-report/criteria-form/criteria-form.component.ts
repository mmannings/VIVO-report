import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Report } from 'src/app/reporting/models/report';

@Component({
  selector: 'report-criteria-form',
  templateUrl: './criteria-form.component.html',
  styleUrls: ['./criteria-form.component.css']
})
export class CriteriaFormComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description','action'];
  selectQueryForm!: FormGroup;
  constructor(private http: HttpClient,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.selectQueryForm = this.formBuilder.group({
      selectQuery: [''],
      description: ['',Validators.pattern('[A-Za-z \-\_]+')],
    },
    {updateOn: "blur"})
  }
  
  initializeReport(report: Report) {
    let selectModel: FormGroup = this.selectQueryForm;

    report.selectQuery = selectModel.controls['selectQuery'].value;
  }
}
