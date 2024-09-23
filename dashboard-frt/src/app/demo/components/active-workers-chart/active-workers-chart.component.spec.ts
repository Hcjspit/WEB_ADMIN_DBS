import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveWorkersChartComponent } from './active-workers-chart.component';

describe('ActiveWorkersChartComponent', () => {
  let component: ActiveWorkersChartComponent;
  let fixture: ComponentFixture<ActiveWorkersChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveWorkersChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveWorkersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
