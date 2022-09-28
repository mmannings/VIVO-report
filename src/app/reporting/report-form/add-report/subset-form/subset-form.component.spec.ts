import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsetFormComponent } from './subset-form.component';

describe('SubsetFormComponent', () => {
  let component: SubsetFormComponent;
  let fixture: ComponentFixture<SubsetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsetFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
