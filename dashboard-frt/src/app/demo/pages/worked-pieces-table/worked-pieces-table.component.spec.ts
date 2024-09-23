import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkedPiecesTableComponent } from './worked-pieces-table.component';

describe('WorkedPiecesTableComponent', () => {
  let component: WorkedPiecesTableComponent;
  let fixture: ComponentFixture<WorkedPiecesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkedPiecesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkedPiecesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
