import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SetupService } from '../setup.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-setups-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './setups-list.component.html',
  styleUrl: './setups-list.component.scss',
})
export class SetupsListComponent {
  readonly panelOpenState = signal(false);

  constructor(public setupService: SetupService) {}

  updatePageSize({ pageIndex: page, pageSize }: PageEvent) {
    this.setupService.loadData({ page, pageSize });
  }
}
