import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() body: any;
  @Input() subject: any;

  constructor(
    protected ref: NbDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    
  }

  dismiss() {
    this.ref.close();
  }

}
