import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-voteconfirm',
  templateUrl: './modal-voteconfirm.component.html',
  styleUrls: ['./modal-voteconfirm.component.scss'],
})
export class ModalVoteconfirmComponent {
  constructor(public dialogRef: MatDialogRef<ModalVoteconfirmComponent>) {}

  closeModal() {
    this.dialogRef.close();
  }
}
