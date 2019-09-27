import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceiptsComponent } from './view-receipts.component';

describe('ViewReceiptsComponent', () => {
  let component: ViewReceiptsComponent;
  let fixture: ComponentFixture<ViewReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReceiptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
