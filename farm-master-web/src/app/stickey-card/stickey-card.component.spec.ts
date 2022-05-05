import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StickeyCardComponent } from './stickey-card.component';

describe('UserProfileComponent', () => {
  let component: StickeyCardComponent;
  let fixture: ComponentFixture<StickeyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickeyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StickeyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
