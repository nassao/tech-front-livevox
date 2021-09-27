import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from 'src/app/models/users-response';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent {
  nameFormControl: FormControl;
  emailFormControl: FormControl;
  matcher: ErrorStateMatcher;

  genders = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
  ];
  statuses = [
    {value: 'active', viewValue: 'Active'},
    {value: 'inactive', viewValue: 'Inactive'},
  ];

  constructor(
      public dialogRef: MatDialogRef<UpdateModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Users
    ) {
    this.nameFormControl = new FormControl('', [
      Validators.required,
    ]);
  
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
  
    this.matcher = new ErrorStateMatcher();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(data: Users) {
    console.log("onClick data: ", data);
    this.dialogRef.close();
    
  }

}
