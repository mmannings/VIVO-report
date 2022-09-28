import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CriteriaFormComponent } from './add-report/criteria-form/criteria-form.component';
import { SubsetFormComponent } from './add-report/subset-form/subset-form.component';
import { ExportFormComponent } from './add-report/export-form/export-form.component';
import { TemplateFormComponent } from './add-report/template-form/template-form.component';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { FormControlName, FormGroup, FormGroupDirective } from '@angular/forms';


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

  @ViewChild(SubsetFormComponent)
  subsetComponent!: SubsetFormComponent;
  @ViewChild(CriteriaFormComponent)
  criteriaComponent!: CriteriaFormComponent;
  @ViewChild(TemplateFormComponent) 
  templateComponent!: TemplateFormComponent;
  @ViewChild(ExportFormComponent)
  exportComponent!: ExportFormComponent;


  constructor() { }

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
}
