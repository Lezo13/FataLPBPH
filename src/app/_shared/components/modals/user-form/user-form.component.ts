import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { RoleEnum } from 'src/app/_shared/enums';
import { UserFormModalOptions, FileExtended, User, DropdownItem } from 'src/app/_shared/models';
import { ERROR_RESPONSES, ROLE_NAMES } from 'src/app/_shared/records';
import { UserHttpService } from 'src/app/_shared/services';
import { MiscUtils, ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  @ViewChild('userForm') form!: NgForm;
  @Input() data!: UserFormModalOptions;
  username: string = null;
  user: User;
  imageFile: FileExtended = null;
  roles: DropdownItem[] = [];

  isLoading: boolean = true;
  isSubmitted: boolean = false;
  isSaving: boolean = false;

  constructor(
    public modalInstance: NgbActiveModal,
    private userHttpService: UserHttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.username = this.data.username;
    this.loadLists();
    this.loadData();
  }

  clearImageFile(): void {
    this.user.profilePictureUrl = null;
  }

  async save(): Promise<void> {
    this.isSubmitted = true;

    if (!this.form.form?.valid)
      return;

    if (ObjectUtils.hasData(this.imageFile)) {
      const imageBase64: string = await MiscUtils.fileToBase64(this.imageFile) as string;
      this.user.profilePictureUrl = imageBase64;
    }

    this.updateUser();
  }

  private loadLists(): void {
    this.roles = [
      { name: ROLE_NAMES[RoleEnum.Admin], value: RoleEnum.Admin },
      { name: ROLE_NAMES[RoleEnum.Moderator], value: RoleEnum.Moderator },
      { name: ROLE_NAMES[RoleEnum.Staff], value: RoleEnum.Staff },
      { name: ROLE_NAMES[RoleEnum.Player], value: RoleEnum.Player },
    ]
  }

  private loadData(): void {
    this.isLoading = true;

    this.userHttpService.getUser(this.username)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isLoading = false;
      });
  }

  private updateUser(): void {
    this.isSaving = true;

    this.userHttpService.updateUser(this.user)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.modalInstance.close();
          this.toastr.success(`Successfully updated ${this.user?.ingameName}`);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isSaving = false;
      });
  }
}
