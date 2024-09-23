import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLineChartComponent } from './top-line-chart.component';

describe('TopLineChartComponent', () => {
  let component: TopLineChartComponent;
  let fixture: ComponentFixture<TopLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopLineChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
