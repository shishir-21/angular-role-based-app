import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {
  user: any;
  usersList: any[] = [];
  isLoading = true;

  userForm!: FormGroup;
  isEditing = false;
  editingUserId: string | null = null;
  isSaving = false;
  
  successMessage = '';
  errorMessage = '';

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    
    // Auth & Role Guard
    if (!this.user || this.user.role !== 'Admin') {
      this.router.navigate(['/login']);
      return;
    }

    this.initForm();
    this.fetchUsers();
  }

  initForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      userId: ['', Validators.required],
      password: ['', Validators.required],
      role: ['General User', Validators.required]
    });
  }

  fetchUsers() {
    this.isLoading = true;
    this.apiService.getUsers(this.user.role).subscribe({
      next: (data) => {
        this.usersList = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to fetch users', err);
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onSubmitUser() {
    if (this.userForm.invalid) return;
    this.isSaving = true;

    if (this.isEditing && this.editingUserId) {
      this.apiService.updateUser(this.editingUserId, this.userForm.value, this.user.role).subscribe({
        next: () => {
          this.showSuccess('User updated successfully');
          this.fetchUsers();
          this.resetForm();
        },
        error: () => this.showError('Failed to update user')
      });
    } else {
      this.apiService.createUser(this.userForm.value, this.user.role).subscribe({
        next: () => {
          this.showSuccess('User created successfully');
          this.fetchUsers();
          this.resetForm();
        },
        error: () => this.showError('Failed to create user')
      });
    }
  }

  editUser(userToEdit: any) {
    this.isEditing = true;
    this.editingUserId = userToEdit.id;
    this.userForm.patchValue({
      name: userToEdit.name,
      userId: userToEdit.userId,
      password: userToEdit.password,
      role: userToEdit.role
    });
    this.cdr.markForCheck();
  }

  deleteUser(id: string) {
    if (id === this.user.id) {
      this.showError('You cannot delete your own admin account.');
      return;
    }

    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(id, this.user.role).subscribe({
        next: () => {
          this.showSuccess('User deleted successfully');
          this.fetchUsers();
        },
        error: () => this.showError('Failed to delete user')
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.editingUserId = null;
    this.isSaving = false;
    this.userForm.reset({ role: 'General User' });
    this.cdr.markForCheck();
  }

  showSuccess(msg: string) {
    this.successMessage = msg;
    this.errorMessage = '';
    this.isSaving = false;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.successMessage = '';
      this.cdr.markForCheck();
    }, 3000);
  }

  showError(msg: string) {
    this.errorMessage = msg;
    this.successMessage = '';
    this.isSaving = false;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.errorMessage = '';
      this.cdr.markForCheck();
    }, 3000);
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
