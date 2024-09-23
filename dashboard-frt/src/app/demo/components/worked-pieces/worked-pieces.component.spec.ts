import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkedPiecesComponent } from './worked-pieces.component';

describe('WorkedPiecesTableComponent', () => {
  let component: WorkedPiecesComponent;
  let fixture: ComponentFixture<WorkedPiecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkedPiecesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkedPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
