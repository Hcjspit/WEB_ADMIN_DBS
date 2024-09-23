import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDefectsTabComponent } from './top-defects-tab.component';

describe('TopDefectsTabComponent', () => {
  let component: TopDefectsTabComponent;
  let fixture: ComponentFixture<TopDefectsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopDefectsTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopDefectsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
