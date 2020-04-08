import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChange,
} from "@angular/core";

import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  editName: string;
  editAmount: number;
  // editForm = new FormGroup({
  //   name: new FormControl(this.editName, Validators.required),
  //   amount: new FormControl(this.editAmount, [
  //     Validators.required,
  //     Validators.pattern(/^[1-9]+[0-9]*$/),
  //   ]),
  // });

  editForm: FormGroup;

  constructor(
    private slService: ShoppingListService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.editForm = this.createEditForm();
    this.subscription = this.slService.startEdit.subscribe((index: number) => {
      this.editedItemIndex = index; //pass index value from startEdit Subject in Shopping-list.service into this.editedItemIndex
      this.editMode = true; //turn editMode on

      this.editedItem = this.slService.getIngredient(index); //pass shopping-list.service's ingredients[index] value into this.editedItem
      // this.editForm.get("name").setValue(this.editedItem.name);
      // this.editForm.get("amount").setValue(this.editedItem.amount);
    });
  }

  // ngOnChanges(changes: SimpleChange) {
  //   this.editForm.get("name").valueChanges.subscribe((data) => {
  //     this.editName = data;
  //     this.editForm.get("name").setValue(this.editName);
  //   });
  //   this.editForm.get("amount").valueChanges.subscribe((data) => {
  //     this.editAmount = data;
  //     this.editForm.get("amount").setValue(this.editAmount);
  //   });
  //   console.log(this.editForm.value);
  // }

  onSubmit() {
    debugger;
    // const newIngredient = new Ingredient(this.editName, this.editAmount);

    // console.log(this.editForm.value);

    // if (this.editMode) {
    //   this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    // } else {
    //   this.slService.addIngredient(newIngredient);
    // }
    // this.editMode = false;
  }

  onClear() {
    this.editForm.reset();
    console.log("hi");

    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createEditForm(): FormGroup {
    return this.fb.group({
      name: [""],
      amount: [""],
    });
  }
}
