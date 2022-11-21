import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'report-export-form',
  templateUrl: './export-form.component.html',
  styleUrls: ['./export-form.component.css']
})
export class ExportFormComponent implements OnInit {
  modelForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit() {
    
    this.modelForm = this.formBuilder.group({
      name: ['',Validators.pattern('[A-Za-z \-\_]+')],
      name2: ['',Validators.pattern('[A-Za-z \-\_]+')],
      name3: ['',Validators.pattern('[A-Za-z \-\_]+')],
    },
    {updateOn: "blur"});
  }

}
