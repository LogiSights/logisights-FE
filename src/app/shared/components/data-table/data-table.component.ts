import { Component, Input, ViewChild, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface ColumnConfig {
  key: string;
  label: string;
  type?: 'text' | 'badge' | 'action';
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnChanges, AfterViewInit {
  @Input() columns: ColumnConfig[] = [];
  @Input() data: any[] = [];
  @Input() isLoading: boolean = false;
  
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];
  
  // Create an array for skeleton rows
  skeletonRows = Array(5).fill(0);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns'] && this.columns) {
      this.displayedColumns = this.columns.map(c => c.key);
    }
    if (changes['data'] && this.data) {
      this.dataSource.data = this.data;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
