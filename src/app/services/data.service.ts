import { Injectable } from '@angular/core';
import { ItemData } from '../model/item-data.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private listOfData: ItemData[] = [];

  constructor() {}

  getItems(): ItemData[] {
    return this.listOfData;
  }

  addItem(itemData: ItemData): void {
    const newItem = { ...itemData, id: this.generateId() };
    this.listOfData.push(newItem);
  }


  updateItem(updatedItemData: ItemData): void {
    console.log('Updating item:', updatedItemData);
    const index = this.listOfData.findIndex(item => item.id === updatedItemData.id);
    if (index !== -1) {
      this.listOfData[index] = { ...this.listOfData[index], ...updatedItemData };
    }
  }

  deleteItem(id: string): void {
    this.listOfData = this.listOfData.filter(item => item.id !== id);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

}
