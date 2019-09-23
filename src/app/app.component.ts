import { Component } from '@angular/core';

enum ItemTypeEnum {
  empty,
  impassable,
  creature
}

interface TableItemInterface {
  itemType: ItemTypeEnum;
  itemText: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  itemTypeEI = ItemTypeEnum;
  stringInstance = String;

  isPlayMode: boolean = false;
  rowsValue: number = 5;
  colsValue: number = 5;
  tableItems: TableItemInterface[][] = [];

  isContextMenuVisible = false;
  contextMenuX = 0;
  contextMenuY = 0;
  contextForRow: number = 0;
  contextForCol: number = 0;
  contextItems: string[] = [
    'clear',
    'make impassable',
    'make creature',
    'cut',
    'paste'
  ];

  selectedForCutRow: number = -1;
  selectedForCutCol: number = -1;

  constructor() {
    this.updateTableFun();
  }

  updateTableFun() {
    this.tableItems.length = 0;
    for (let rowIndex = 0; rowIndex < this.rowsValue; rowIndex++) {
      this.tableItems.push([]);
      for (let colIndex = 0; colIndex < this.colsValue; colIndex++) {
        this.tableItems[rowIndex].push({itemType: ItemTypeEnum.empty, itemText: ''});
      }
    }
  }

  open(event, row: number, col: number) {
    event.preventDefault();
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY;
    this.contextForRow = row;
    this.contextForCol = col;
    this.isContextMenuVisible = true;
  }

  disableContextMenu() {
    this.isContextMenuVisible = false;
  }

  onContextMenuClick(indexClicked: number) {
    switch (indexClicked) {
      case 0:
        this.tableItems[this.contextForRow][this.contextForCol].itemType = ItemTypeEnum.empty;
        this.tableItems[this.contextForRow][this.contextForCol].itemText = '';
        break;
      case 1:
        this.tableItems[this.contextForRow][this.contextForCol].itemType = ItemTypeEnum.impassable;
        this.tableItems[this.contextForRow][this.contextForCol].itemText = '';
        break;
      case 2:
        this.tableItems[this.contextForRow][this.contextForCol].itemType = ItemTypeEnum.creature;
        this.tableItems[this.contextForRow][this.contextForCol].itemText = 'Creat';
        break;
      case 3:
        this.selectedForCutRow = this.contextForRow;
        this.selectedForCutCol = this.contextForCol;
        break;
      case 4:
        this.tableItems[this.contextForRow][this.contextForCol].itemType = this.tableItems[this.selectedForCutRow][this.selectedForCutCol].itemType;
        this.tableItems[this.contextForRow][this.contextForCol].itemText = this.tableItems[this.selectedForCutRow][this.selectedForCutCol].itemText;
        this.tableItems[this.selectedForCutRow][this.selectedForCutCol].itemType = ItemTypeEnum.empty;
        this.tableItems[this.selectedForCutRow][this.selectedForCutCol].itemText = '';
        this.selectedForCutRow = -1;
        this.selectedForCutCol = -1;
        break;
      default:
        break;
    }
    this.disableContextMenu();
  }

  onTableCellDoubleClick(itemType: ItemTypeEnum, rowIndex: number, colIndex: number) {
    if (itemType === ItemTypeEnum.creature) {
      console.log(true);
    }
  }

}
