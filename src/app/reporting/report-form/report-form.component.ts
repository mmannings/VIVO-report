import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CriteriaFormComponent } from './criteria-form/criteria-form.component';
import { DatabaseFormComponent } from './database-form/database-form.component';
import { ExportFormComponent } from './export-form/export-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { FormControlName, FormGroup, FormGroupDirective } from '@angular/forms';


const DATABASE_INDEX: number = 0;
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
  databaseFormSubscription!: Subscription;
  allFormsValid: boolean = false;

  @ViewChild(DatabaseFormComponent)
  databaseComponent!: DatabaseFormComponent;
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
    this.databaseFormSubscription = this.databaseComponent
      .databaseFormGroup
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(
        (values) => {
          this.handleFormCheck();
        }
      )
  }

  private handleFormCheck() {
    this.handleDatabaseFormCheck();
  }

  private handleDatabaseFormCheck() {
    if (this.currentStepIndex == DATABASE_INDEX) {
      if (this.databaseComponent.databaseFormGroup.valid) {
        this.clearIncorError(DATABASE_INDEX);
      }
    }
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
    console.log("Database form validness: ", this.databaseComponent.databaseFormGroup.status)
    if (previousIndex == DATABASE_INDEX) {
      let validForm: boolean = (this.databaseComponent.databaseFormGroup.valid);
      if (!validForm) {
        this.allFormsValid = false;
      } else {
        this.clearIconError(previousIndex);
        this.allFormsValid = true;
      }
    }
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
