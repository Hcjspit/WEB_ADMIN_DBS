import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineSelectorComponent } from './line-selector.component';

describe('LineSelectorComponent', () => {
  let component: LineSelectorComponent;
  let fixture: ComponentFixture<LineSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
