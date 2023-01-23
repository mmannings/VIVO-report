import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { GraphService } from '../../services/graph.service';

@Component({ templateUrl: 'graph.add-edit.html' })
export class GraphAddEditComponent implements OnInit {
  form!: FormGroup;
  id?: string;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private graphService: GraphService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.form = this.formBuilder.group({
      items: this.formBuilder.array([this.createItem()]),
    });

    if (this.id) {
      this.graphService
        .getById(this.id)
        .pipe(first())
        .subscribe((res) => {
          this.form.patchValue(res);
        });
    }
  }

  onSubmit() {
    this.saveGraph()
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/graph');
        },
        error: (error) => {
          console.log('Some error happened: ' + error);
        },
      });
  }

  createItem() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      constructQuery: ['', Validators.required],
    });
  }

  addNext() {
    this.controls.push(this.createItem());
  }

  get controls() {
    return (<FormArray>this.form.get('items')).controls;
  }

  private saveGraph() {
    return this.id
      ? this.graphService.update(this.id!, this.form.value)
      : this.graphService.create(this.form.value);
  }
}
