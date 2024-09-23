import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfficiencyPercChartComponent } from './efficiency-perc-chart.component';

describe('EfficiencyPercChartComponent', () => {
  let component: EfficiencyPercChartComponent;
  let fixture: ComponentFixture<EfficiencyPercChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfficiencyPercChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EfficiencyPercChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
