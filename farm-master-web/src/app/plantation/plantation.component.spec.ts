import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenificialsComponent } from './benificials.component';

describe('UserProfileComponent', () => {
  let component: BenificialsComponent;
  let fixture: ComponentFixture<BenificialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenificialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenificialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
