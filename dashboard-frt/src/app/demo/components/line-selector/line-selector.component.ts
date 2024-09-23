import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkedPiecesService } from 'src/app/services/worked-pieces/worked-pieces.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-line-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './line-selector.component.html',
  styleUrl: './line-selector.component.scss'
})
export class LineSelectorComponent {
  lines: { id: string; name: string }[] = [
    { id: '001', name: 'Line1' },
    { id: '002', name: 'Line2' },
    { id: '003', name: 'Line3' },
    { id: '004', name: 'Line4' },
    { id: '005', name: 'Line5' },
    { id: '006', name: 'Line6' },
    { id: '007', name: 'Line7' },
    { id: '008', name: 'Line8' },
    { id: '009', name: 'Line9' },
    { id: '010', name: 'Line10' },
    { id: '011', name: 'Line11' },
    { id: '012', name: 'Line12' },
    { id: '013', name: 'Line13' },
    { id: '014', name: 'Line14' },
    { id: '015', name: 'Line15' },
    { id: '016', name: 'Line16' },
    { id: '017', name: 'Line17' },
    { id: '018', name: 'Line18' },
    { id: '019', name: 'Line19' },
    { id: '020', name: 'Line20' }
  ];
  selectedLine: string = '';
  limits: { display: string; value: number }[] = [
    { display: '25', value: 25 },
    { display: '50', value: 50 },
    { display: '75', value: 75 },
    { display: '100', value: 100 },
    { display: '200', value: 200 },
    { display: 'Max', value: -1 }
  ];
  selectedLimit: number = this.limits[0].value;
  style: string = '';
  stage: string = '';
  name: string = '';

  constructor(private workedPiecesService: WorkedPiecesService) {}

  onLineChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLine = selectElement.value;
    this.updateTableData();
  }

  onLimitChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLimit = parseInt(selectElement.value, 10);
    this.updateTableData();
  }

  onStyleChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.style = inputElement.value.trim().toUpperCase();
    this.updateTableData();
  }

  onStageChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.stage = inputElement.value.trim().toUpperCase();
    this.updateTableData();
  }

  onNameChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.name = inputElement.value.trim();
    this.updateTableData();
  }

  updateTableData(): void {
    const filters = {
      style: this.style.length >= 4 ? this.style : '',
      stage: this.stage.length >= 1 ? this.stage : '',
      name: this.name.length >= 1 ? this.name : ''
    };
    this.workedPiecesService.selectLine(this.selectedLine, this.selectedLimit, filters);
  }
}
