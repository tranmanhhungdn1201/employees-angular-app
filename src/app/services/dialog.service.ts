import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../components/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(message: string) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      disableClose: true,
      panelClass: 'confirm-dialog-container',
      data: {
        message
      }
    })
  }
}
