import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CriteriaFormComponent } from './add-report/criteria-form/criteria-form.component';
import { SubsetFormComponent } from './add-report/subset-form/subset-form.component';
import { ExportFormComponent } from './add-report/export-form/export-form.component';
import { TemplateFormComponent } from './add-report/template-form/template-form.component';
import { debounceTime, distinctUntilChanged, first, Subscription } from 'rxjs';
import { FormControlName, FormGroup, FormGroupDirective } from '@angular/forms';
import { Report } from '../models/report';
import { ReportService } from '../services/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { StepperDataService } from '../services/stepper-data.service';


const SUBSET_INDEX: number = 0;
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
  subsetFormSubscription!: Subscription;
  allFormsValid: boolean = false;
  report: Report = {} as Report;
  isButtonVisible = true;
  response!: any[];

  @ViewChild(SubsetFormComponent)
  subsetComponent!: SubsetFormComponent;
  @ViewChild(CriteriaFormComponent)
  criteriaComponent!: CriteriaFormComponent;
  @ViewChild(TemplateFormComponent) 
  templateComponent!: TemplateFormComponent;
  @ViewChild(ExportFormComponent)
  exportComponent!: ExportFormComponent;


  constructor(private reportService: ReportService,
              private stepperDataService: StepperDataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.handleSubscriptions();
  }

  private handleSubscriptions() {
    
  }

  private handleFormCheck() {
    this.handleDatabaseFormCheck();
  }

  private handleDatabaseFormCheck() {

  }

  private clearIncorError(index: number) {
    let iconElement: HTMLElement = this.getIconElementByIndex(index);
    iconElement.classList.remove('mat-step-icon-invalid');
  }

  private getIconElementByIndex(index: number): HTMLElement {
    let nodeList: NodeList = document.querySelectorAll('.mat-step-icon');
    let node: Node = nodeList.item(index) as Node;
    return (<HTMLElement>node);
  }

  onStepChange(event: any) {
    let previousIndex: number = event.previouslySelectedIndex;
    let currentIndex: number = event.selectedIndex;

    this.currentStepIndex = currentIndex;
    
    if (previousIndex == SUBSET_INDEX) {
      this.subsetComponent.initializeReport(this.report);
    }
    else if (previousIndex == CRITERIA_INDEX) {
      this.criteriaComponent.initializeReport(this.report);
    }
    else if (previousIndex == TEMPLATE_INDEX) {
      this.templateComponent.initializeReport(this.report);
    }
  }

  valueFromChild!: boolean;
  hideStepperButtons(valueEmitted: any) {
      this.isButtonVisible = valueEmitted;
      console.log("(Parent) Value emitted: " + valueEmitted);
  }

  saveReport() {
    this.reportService.create(this.report) 
      .pipe(first())
      .subscribe(data => {
        let result :string[] = []

        console.log("Result equals: ", result);
        console.log("data received from RPC-post: ", JSON.stringify(data));
        
        console.log("Report was added. Redirecting to home");
        this.router.navigate(['../'], { relativeTo: this.route});
      });
  }

  private changeIcon(index: number) {
    let iconElement: HTMLElement = this.getIconElementByIndex(index);
    console.log('HTMLElement icon index: ', HTMLElement);
    iconElement.classList.add('mat-step-icon-invalid');
    console.log('HTMLElement icon index: ', HTMLElement);
  }

  private clearIconError(index: number) {
    let iconElement: HTMLElement = this.getIconElementByIndex(index);
    iconElement.classList.remove('mat-step-icon-invalid');
  }

  setIndex(event: any) {
    this.currentStepIndex = event.selectedIndex;
  }

  triggerClick() {
    console.log("Selected index: ", this.currentStepIndex);
  }

  onNext(stepper: MatStepper) {
    console.log('test');
    this.stepperDataService.getData().subscribe(data => {
      this.response = data;
      console.log('this.data from next(): ', this.response);
    })
    stepper.next();
  }
}
