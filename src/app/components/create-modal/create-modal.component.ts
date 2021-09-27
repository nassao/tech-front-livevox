import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserResponse } from 'src/app/models/users-response';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent {
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
    public dialogRef: MatDialogRef<CreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private snackBarMessage: MatSnackBar
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
   * Create new user
   * @param data User info
   */
  onClick(data: User) {
    this.rest.createUser(data).subscribe((userResponse: UserResponse) => {
      const currentUser = userResponse.data as User;
      this.snackBarMessage.open(
        `New user ${currentUser.name} created with id ${currentUser.id}`,
        '',
        { duration: 5000 }
        );

      // close Modal
      this.dialogRef.close();
    }, error => {
      const currentUser = error.data[0];
      this.snackBarMessage.open(
        `Error in ${currentUser.field}: ${currentUser.message}`,
        '',
        { duration: 5000 }
        );
    });
  }
}
