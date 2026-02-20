import { Component, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User, UserFormModalOptions } from 'src/app/_shared/models';
import { ComponentModalService, UserHttpService } from 'src/app/_shared/services';

@Component({
  selector: 'app-manage-users',
  standalone: false,
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];

  isLoading: boolean = true;

  private modalService = inject(ComponentModalService);
  private userHttpService = inject(UserHttpService);

  ngOnInit(): void {
    this.loadUsers();
  }

  editUser(user: User): void {
    const options: UserFormModalOptions = {
      title: 'Edit User',
      username: user.username
    };

    this.modalService.showUserFormModal(options).then(result => {
      this.loadUsers();
    }).catch(() => { });
  }

  private loadUsers(): void {
    this.isLoading = true;

    this.userHttpService.getAllUsers()
      .pipe((take(1)))
      .subscribe((users: User[]) => {
        this.users = users;
      }).add(() => {
        this.isLoading = false;
      });
  }
}
