import { Component, OnInit, Inject} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UsersResponse, Users, UsersResponsePagination } from 'src/app/models/users-response';

import { RestService } from "../../services/rest.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  private userList: Array<Users> = [];
  userPagination: UsersResponsePagination;
  firstResult: number = 0;
  lastResult: number = 0;
  
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status'];
  dataSource = new MatTableDataSource<Users>();
 
  constructor(private rest: RestService, public dialog: MatDialog) {
    this.userPagination = {
      "page": 0,
      "pages": 0,
      "total": 0,
      "limit": 20,
      "links": {
        "previous": null,
        "current": null,
        "next": null
      },
    };
  }

  ngOnInit(): void {
    this.getUserList();
  }

  /**
   * Fetch users list (default: first page)
   */
  async getUserList() {
    this.rest.getUsers().subscribe((userResponse: UsersResponse) => {
      this.userList = userResponse.data;
      this.userPagination = userResponse.meta.pagination;

      // Assign results to table
      this.dataSource.data = this.userList;
      
      // Data for pagination
      this.firstResult = ((this.userPagination.page - 1) * this.userPagination.limit) + 1
      this.lastResult = this.userPagination.page * this.userPagination.limit
    });
    
  }

  openModal(user: Users) {
    console.log(user);
    const dialogRef = this.dialog.open(DialogModal, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
    
  }
}



@Component({
  selector: 'dialog-modal',
  templateUrl: 'dialog-modal.html',
})
export class DialogModal {

  constructor(
    public dialogRef: MatDialogRef<DialogModal>,
    @Inject(MAT_DIALOG_DATA) public data: Users) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

