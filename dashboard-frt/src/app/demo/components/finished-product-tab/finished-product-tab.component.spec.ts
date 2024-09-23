import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedProductTabComponent } from './finished-product-tab.component';

describe('FinishedProductTabComponent', () => {
  let component: FinishedProductTabComponent;
  let fixture: ComponentFixture<FinishedProductTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedProductTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishedProductTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
