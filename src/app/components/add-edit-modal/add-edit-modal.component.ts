import { NzModalRef } from 'ng-zorro-antd/modal';
import { ItemData } from './../../model/item-data.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ageValidator } from 'src/app/validators/age.validator';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss'],
})
export class AddEditModalComponent implements OnInit {
  @Input() itemData: ItemData = {
    id: '',
    name: '',
    age: '',
    address: '',
  };

  formGroup: FormGroup;

  constructor(private modalRef: NzModalRef, private fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [this.itemData.name, Validators.required],
      age: [this.itemData.age, [Validators.required, ageValidator(18, 100)]],
      address: [this.itemData.address, Validators.required],
    });
  }

  submitForm(value: ItemData): void {
    if (this.formGroup.valid) {
      const result: ItemData = { ...value, id: this.itemData.id };
      this.modalRef.close(result);
    }
  }


  closeModal() {
    this.modalRef.close();
  }
}
