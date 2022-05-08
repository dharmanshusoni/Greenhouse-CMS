import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PestIntensityComponent } from './pest-intensity.component';

describe('PestIntensityComponent', () => {
  let component: PestIntensityComponent;
  let fixture: ComponentFixture<PestIntensityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PestIntensityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PestIntensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
