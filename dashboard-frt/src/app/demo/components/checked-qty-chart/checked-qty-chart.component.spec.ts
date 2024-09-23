import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedQtyChartComponent } from './checked-qty-chart.component';

describe('CheckedQtyChartComponent', () => {
  let component: CheckedQtyChartComponent;
  let fixture: ComponentFixture<CheckedQtyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckedQtyChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckedQtyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
