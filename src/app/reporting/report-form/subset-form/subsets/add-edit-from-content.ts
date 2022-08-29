import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs";
import { SubsetFromContentService } from "src/app/reporting/services/subset-from-content.service";

@Component({ templateUrl: 'add-edit-from-content.html' })
export class AddEditFromComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    submitted = false;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private subsetFromContentService: SubsetFromContentService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        this.form = this.formBuilder.group({
            'http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#actionName': ['', Validators.required],
            'http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#uriBinding': [''], 
            'http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#literalBinding': [''],
            'http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#query': [''],
            submitted: 'submitted'
        })
    }
    
    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        if (this.isAddMode) {
            this.createSubset();
        } else {
            this.updateSubset();
        }
    }

    private createSubset() {
        console.log(this.form.value);
        this.subsetFromContentService.create(this.form.controls['http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#actionName'].value,
                                            this.form.controls['http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#uriBinding'].value,
                                            this.form.controls['http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#literalBinding'].value,
                                            this.form.controls['http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#query'].value,
                                            this.form.controls['submitted'].value) 
            .pipe(first())
            .subscribe(data => {
                console.log(data);
                this.router.navigate(['../'], { relativeTo: this.route});
            })
            .add(() => this.loading = false);
    }

    private login() {
        this.subsetFromContentService.login()
            .pipe(first())
            .subscribe((data: any) => {
                console.log(data) 
            })
    }

    private updateSubset() {
        this.subsetFromContentService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.router.navigate(['../'], { relativeTo: this.route});
            })
            .add(() => this.loading = false);
    }
}