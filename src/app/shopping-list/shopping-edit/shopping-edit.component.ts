import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @Output() EditAddName = new EventEmitter<string>();
  @Output() EditAddAmount = new EventEmitter<number>();
  @Output() EditPush = new EventEmitter<any>();
  nameEdit: string;
  amountEdit: number;

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    this.EditAddName.emit(this.nameEdit);
    this.EditAddAmount.emit(this.amountEdit);
    this.EditPush.emit();
  }
}
