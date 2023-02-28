import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-nosongsfound',
  templateUrl: './modal-nosongsfound.component.html',
  styleUrls: ['./modal-nosongsfound.component.scss'],
})
export class ModalNosongsfoundComponent {
  constructor(public dialogRef: MatDialogRef<ModalNosongsfoundComponent>) {}

  closeModal() {
    this.dialogRef.close();
  }
}
