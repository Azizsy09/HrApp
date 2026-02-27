import { Component, OnInit } from '@angular/core';
import { LeaveService, Leave } from '../leave';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './leave-list.html',
  styleUrl: './leave-list.css',
})
export class LeaveList implements OnInit {

  leaves: Leave[] = [];

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.leaveService.getLeaves().subscribe(data => {
      this.leaves = data;
    });
  }
}