import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmLayoutComponent } from './farm-layout.component';

describe('UserProfileComponent', () => {
  let component: FarmLayoutComponent;
  let fixture: ComponentFixture<FarmLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
