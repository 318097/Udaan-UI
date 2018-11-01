import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(public snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = '') {
    return this.snackBar.open(message, action, {
      duration: 2000,
    }).afterDismissed();
  }
}
