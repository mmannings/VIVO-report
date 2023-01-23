import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGraphComponent } from './list-graph.component';

describe('ListGraphComponent', () => {
  let component: ListGraphComponent;
  let fixture: ComponentFixture<ListGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
