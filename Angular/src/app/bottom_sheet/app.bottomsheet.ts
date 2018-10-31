import { MatBottomSheetRef } from "@angular/material";
import { Component } from "@angular/core";

@Component({
    selector: 'share-sheet',
    templateUrl: 'app.share-sheet.html',
  })
  export class ShareBottomSheet {
    constructor(private bottomSheetRef: MatBottomSheetRef<ShareBottomSheet>) {}
  
    openLink(event: MouseEvent): void {
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }
  }