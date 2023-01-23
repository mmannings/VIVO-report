import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialFileUploaderComponent } from './material-file-uploader.component';

describe('MaterialFileUploaderComponent', () => {
  let component: MaterialFileUploaderComponent;
  let fixture: ComponentFixture<MaterialFileUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialFileUploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
