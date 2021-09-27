import { Component, OnInit, Inject} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { UserResponse, User, UserResponsePagination } from 'src/app/models/users-response';

import { RestService } from "../../services/rest.service";
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { CreateModalComponent } from '../create-modal/create-modal.component';

const emptyPagination: UserResponsePagination = {
  "page": 0,
  "pages": 0,
  "total": 0,
  "limit": 20,
  "links": {
    "previous": null,
    "current": null,
    "next": null
  },
}
const emptyUser: User = {
  "id": 0,
  "name": "",
  "email": "",
  "gender": "male",
  "status": "active"
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  private userList: Array<User> = [];
  userPagination: UserResponsePagination;
  firstResult: number = 0;
  lastResult: number = 0;
  
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource = new MatTableDataSource<User>();
 
  constructor(private rest: RestService, public dialog: MatDialog) {
    this.userPagination = emptyPagination;
  }

  ngOnInit(): void {
    this.getUserList();
  }

  /**
   * Fetch users list (default: first page)
   */
  async getUserList() {
    this.rest.getUsers().subscribe((userResponse: UserResponse) => {
      this.userList = userResponse.data;
      this.userPagination = userResponse.meta?.pagination || emptyPagination;

      // Assign results to table
      this.dataSource.data = this.userList;
      
      // Data for pagination
      this.firstResult = ((this.userPagination.page - 1) * this.userPagination.limit) + 1
      this.lastResult = this.userPagination.page * this.userPagination.limit
    });
    
  }

  /**
   * Popup modal with user detail
   * @param user User to update
   */
  openModal(user: User) {
    const dialogRef = this.dialog.open(UpdateModalComponent, {
        width: '500px',
      data: user
    });

    // When change a user, reload the table with updated data
    dialogRef.afterClosed().subscribe(() => {
      this.getUserList();
    });
  }

  newUser() {
    const dialogRef = this.dialog.open(CreateModalComponent, {
      width: '500px',
      data: emptyUser
    });

    dialogRef.afterClosed().subscribe(() => {

      /** TODO confirmation message */

      this.getUserList();
    });

  }
}
