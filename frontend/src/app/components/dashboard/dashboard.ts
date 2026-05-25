import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  user: any;
  records: any[] = [];
  isLoading = true;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.fetchRecords();
  }

  fetchRecords() {
    this.isLoading = true;
    this.apiService.getRecords(this.user.userId, this.user.role).subscribe({
      next: (data) => {
        this.records = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to fetch records', err);
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
