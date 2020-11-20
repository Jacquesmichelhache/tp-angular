import { Component, OnInit } from '@angular/core';
import { DialogBase } from '../dialog/dialogBase';


@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent extends DialogBase implements OnInit  {  

  constructor() {super();}

  ngOnInit(): void {
  }

  onYes(){   
    this.closeDialog(true)
  }

  onNo(){
    this.closeDialog(false)
  }

}
