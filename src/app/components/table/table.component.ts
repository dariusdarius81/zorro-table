import { Component, OnInit } from '@angular/core';
import { ItemData } from 'src/app/model/item-data.interface';
import { DataService } from 'src/app/services/data.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddEditModalComponent } from '../add-edit-modal/add-edit-modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  listOfData: ItemData[] = [];

  constructor(
    private dataService: DataService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.listOfData = this.dataService.getItems();
    this.pageIndexChanged();
  }

  pageIndexChanged(): void {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayData = this.listOfData.slice(start, end);
  }

  addRow(): void {
    const modal = this.modalService.create({
      nzTitle: 'Add Item',
      nzContent: AddEditModalComponent,
      nzFooter: null,
    });

    modal.afterClose.subscribe((itemData: ItemData | null) => {
      if (itemData) {
        this.dataService.addItem(itemData);
        this.listOfData = this.dataService.getItems();
        this.pageIndexChanged();

      }
    });
  }

  editRow(data: ItemData): void {
    console.log('Editing item:', data);

    const modal = this.modalService.create({
      nzTitle: 'Edit Item',
      nzContent: AddEditModalComponent,
      nzComponentParams: { itemData: { ...data } },
      nzFooter: null,
    });

    modal.afterClose.subscribe((updatedItemData: ItemData | null) => {
      if (updatedItemData) {
        this.dataService.updateItem(updatedItemData);
        this.listOfData = this.dataService.getItems();
        this.pageIndexChanged();
      }
    });
  }

  deleteRow(id: string): void {
    this.dataService.deleteItem(id);
    this.listOfData = this.dataService.getItems();
    this.pageIndexChanged();

  }

  pageIndex = 1;
  pageSize = 8;
  displayData: ItemData[] = [];
}
