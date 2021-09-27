import { Component, OnInit, Inject} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { UserResponse, User, UserResponsePagination, UserQuery } from 'src/app/models/users-response';

import { RestService } from "../../services/rest.service";
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { CreateModalComponent } from '../create-modal/create-modal.component';
import { FormControl } from '@angular/forms';

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

  searchPage: number = 1;
  searchByName: string = '';
  searchByNameFormControl: FormControl;
 
  constructor(private rest: RestService, public dialog: MatDialog) {
    this.userPagination = emptyPagination;
    this.searchByNameFormControl = new FormControl('', []);
  }

  ngOnInit(): void {
    this.getUserList();
  }

  /**
   * Fetch users list (default: first page)
   * @param query Query parameters for search
   */
  async getUserList(query: UserQuery = {}) {

    this.rest.getUsers(query).subscribe((userResponse: UserResponse) => {
      this.userList = userResponse.data as Array<User>;
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

  /**
   * Create a new user in a Modal
   */
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

  /**
   * Search for a user by partial name
   */
  search() {
    const query: UserQuery = {name: this.searchByName}
    this.getUserList(query);
  }

  /**
   * Search asked page of user list results
   */
  goToPage() {
    const query: UserQuery = {page: this.searchPage};
    if (this.searchByName.length > 0) {
      query.name = this.searchByName;
    }
    this.getUserList(query);
  }

  /**
   * Go to first page of user list results
   */
   goToFirstPage() {
    this.searchPage = 1;
    this.goToPage();
  }

  /**
   * Go to previous page of user list results
   */
   goToPreviousPage() {
    this.searchPage = this.userPagination.page - 1;
    this.goToPage();
  }

  /**
   * Go to next page of user list results
   */
   goToNextPage() {
    this.searchPage = this.userPagination.page + 1;
    this.goToPage();
  }

  /**
   * Go to last page of user list results
   */
   goToLastPage() {
    this.searchPage = this.userPagination.pages;
    this.goToPage();
  }
}
