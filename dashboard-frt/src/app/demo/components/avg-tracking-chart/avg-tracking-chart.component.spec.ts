import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgTrackingChartComponent } from './avg-tracking-chart.component';

describe('AvgTrackingChartComponent', () => {
  let component: AvgTrackingChartComponent;
  let fixture: ComponentFixture<AvgTrackingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvgTrackingChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvgTrackingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
