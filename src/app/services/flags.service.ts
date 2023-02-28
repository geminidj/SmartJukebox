import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlagsService {
  abortSelection: boolean = false;
  constructor() {}

  raiseAbortSelectionFlag() {
    console.log('raising abort flag');
    this.abortSelection = true;
  }

  getAbortSelectionFlag() {
    let result = this.abortSelection;
    this.abortSelection = false;
    return result;
  }
}
