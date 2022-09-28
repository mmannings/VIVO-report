import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { SubsetFromContent } from '../../../models/subset-from-content';
import { ReportService } from '../../../services/report.service';
import { formats } from '../../../constants/format';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'report-subset-form',
  templateUrl: './subset-form.component.html',
  styleUrls: ['./subset-form.component.css'],
})
export class SubsetFormComponent implements OnInit {
  reportForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.reportForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.pattern('[A-Za-z \-\_]+')],
      constructQuery: ['', Validators.required],
      selectQuery: ['', Validators.required],
      variable: ['', Validators.required],
    },
    {updateOn: "blur"});
  }

  onSubmit() {
    if (this.reportForm.invalid) {
      return;
    }

    this.reportService.create(this.reportForm.value)
        .pipe(first())
        .subscribe(() => {
          this.router.navigate(['../'], { relativeTo: this.activeRoute});
        })
  }
}
