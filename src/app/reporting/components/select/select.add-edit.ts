import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

@Component({ templateUrl: 'select.add-edit.html' })
export class SelectAddEditComponent implements OnInit {
    form!: FormGroup;
    
    constructor(private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router) {

    }
    
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            items: this.formBuilder.array([this.createItem()]),
          });
    }
    
    onSubmit() {

    }

    createItem() {
        return this.formBuilder.group({
        });
      }
      
    addNext() {
        this.controls.push(this.createItem());
      }

    get controls() {
        return (<FormArray>this.form.get('items')).controls;
      }
}