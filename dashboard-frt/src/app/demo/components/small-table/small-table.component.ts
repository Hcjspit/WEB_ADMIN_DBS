import { Component } from '@angular/core';
import { SmallTable } from 'src/app/entities/table.entity';
import { TableService } from 'src/app/services/table/table.service';

@Component({
  selector: 'app-small-table',
  standalone: true,
  imports: [],
  templateUrl: './small-table.component.html',
  styleUrl: './small-table.component.scss'
})
export class SmallTableComponent {
  smallTableData: SmallTable | null = null;

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.requestTableData();

    this.tableService.smallTableDataUpdates$.subscribe((data) => {
      this.smallTableData = data;
      console.log('Table Data:', this.smallTableData);
    });
  }
}
