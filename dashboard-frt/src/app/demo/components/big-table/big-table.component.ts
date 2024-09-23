import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BigTable } from 'src/app/entities/table.entity';
import { TableService } from 'src/app/services/table/table.service';

@Component({
  selector: 'app-big-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './big-table.component.html',
  styleUrl: './big-table.component.scss'
})
export class BigTableComponent {
  bigTableData: BigTable[] | null = [];

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.requestTableData();

    this.tableService.bigTableDataUpdates$.subscribe((data) => {
      this.bigTableData = data;
      console.log('Table Data:', this.bigTableData);
    });
  }

  getCellDhuColorClass(value: number): string {
    if (value < 2) {
      return 'green-cell';
    } else if (value >= 2 && value < 5) {
      return 'yellow-cell';
    } else {
      return 'red-cell';
    }
  }

  getCellEfficiencyColorClass(value: number): string {
    if (value < 25) {
      return 'red-cell';
    } else if (value >= 25 && value < 75) {
      return 'yellow-cell';
    } else if (value >= 75 && value < 100) {
      return 'green-cell';
    } else {
      return 'dark-green-cell';
    }
  }
}
