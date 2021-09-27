import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, UserResponse } from 'src/app/models/users-response';
import { RestService } from 'src/app/services/rest.service';

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
    private rest: RestService,
    public dialogRef: MatDialogRef<UpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
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

  /**
   * Close with no changes in user info
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Update User info
   * @param data User info
   */
  onClick(data: User) {
    this.rest.updateUser(data).subscribe((userResponse: UserResponse) => {

      /** TODO confirmation message */

      // close Modal
      this.dialogRef.close();
    }, error => {

      /** TODO show error message */

    });
  }

  /**
   * Delete existing user
   * @param id User ID to delete
   */
  onDeleteClick(id: number) {
    this.rest.deleteUser(id).subscribe(() => {

      /** TODO confirmation message */

      // close Modal
      this.dialogRef.close();
    }, error => {

      /** TODO show error message */

    });
  }

}
