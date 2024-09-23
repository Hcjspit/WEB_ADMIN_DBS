import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMachinesChartComponent } from './active-machines-chart.component';

describe('ActiveMachinesChartComponent', () => {
  let component: ActiveMachinesChartComponent;
  let fixture: ComponentFixture<ActiveMachinesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveMachinesChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveMachinesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
