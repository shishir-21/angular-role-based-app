import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {
  user: any;
  usersList: any[] = [];
  isLoading = true;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    
    // Auth & Role Guard
    if (!this.user || this.user.role !== 'Admin') {
      this.router.navigate(['/login']);
      return;
    }

    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true;
    this.apiService.getUsers(this.user.role).subscribe({
      next: (data) => {
        this.usersList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch users', err);
        this.isLoading = false;
      }
    });
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
