import { Component, OnInit } from '@angular/core';
import { WorkedPiecesTable } from 'src/app/entities/table.entity';
import { CommonModule } from '@angular/common';
import { WorkedPiecesService } from 'src/app/services/worked-pieces/worked-pieces.service';

@Component({
  selector: 'app-worked-pieces',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worked-pieces.component.html',
  styleUrl: './worked-pieces.component.scss'
})
export class WorkedPiecesComponent implements OnInit {
  workedPiecesData: WorkedPiecesTable[] = [];
  lineSelected: boolean = false;
  noDataFound: boolean = false;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private workedPiecesService: WorkedPiecesService) {}

  ngOnInit(): void {
    this.workedPiecesService.workedPiecesDataUpdates$.subscribe((data) => {
      console.log('Table data updated:', data);
      this.workedPiecesData = data.map((item) => ({
        ...item,
        ACHIEVED:
          (item.H1 ?? 0) +
          (item.H2 ?? 0) +
          (item.H3 ?? 0) +
          (item.H4 ?? 0) +
          (item.H5 ?? 0) +
          (item.H6 ?? 0) +
          (item.H7 ?? 0) +
          (item.H8 ?? 0) +
          (item.H9 ?? 0)
      }));
      this.lineSelected = true;
      this.noDataFound = data.length === 0;
    });
  }

  sortData(column: keyof WorkedPiecesTable): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.workedPiecesData.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA! < valueB!) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA! > valueB!) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getCellClass(value: number | null): string {
    if (value === null) {
      return '';
    } else if (value >= 75 && value < 100) {
      return 'green-cell';
    } else if (value >= 25 && value < 75) {
      return 'yellow-cell';
    } else if (value >= 0 && value < 25) {
      return 'red-cell';
    } else {
      return 'dark-green-cell';
    }
  }
}
