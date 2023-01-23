import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Report } from 'src/app/reporting/models/report';
import { StepperDataService } from 'src/app/reporting/services/stepper-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'report-criteria-form',
  templateUrl: './criteria-form.component.html',
  styleUrls: ['./criteria-form.component.css']
})
export class CriteriaFormComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description','action'];
  selectQueryForm!: FormGroup;
  array!: any[];
  private subscription!: Subscription;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private stepperDataService: StepperDataService) { }

  ngOnInit(): void {
    this.selectQueryForm = this.formBuilder.group({
      name: this.array,
      selectQuery: [''],
      description: ['',Validators.pattern('[A-Za-z \-\_]+')],
    },
    {updateOn: "blur"})

    this.subscription = this.stepperDataService.getData().subscribe((data: any) => {
      this.array = data;
      console.log('data: ', this.array);
    })
  }
  
  onSubmit() {
    console.log(this.selectQueryForm.value);
  }

  initializeReport(report: Report) {
    let selectModel: FormGroup = this.selectQueryForm;

    report.selectQuery = selectModel.controls['selectQuery'].value;
  }
}
