import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { SetupService } from '../../_services/setup.service';
import { MatButtonModule } from '@angular/material/button';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Setup } from '../../_services/types';
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
    MatButtonModule,
    CdkAccordionModule,
  ],
  templateUrl: './setups-list.component.html',
  styleUrl: './setups-list.component.scss',
})
export class SetupsListComponent {
  readonly panelOpenState = signal(false);
  expandedIndex = 0;

  constructor(
    public setupService: SetupService,
    private _snackBar: MatSnackBar
  ) {}

  updatePageSize({ pageIndex: page, pageSize }: PageEvent) {
    this.setupService.loadData({ page, pageSize });
  }

  onDelete(event: MouseEvent, setup: Setup) {
    event.stopPropagation();

    const next = () => {
      this._snackBar.open(`${setup.name} Deleted`, 'Ok');
      this.setupService.refreshBatch();
    };

    const error = () => {
      this._snackBar.open(`Could not copy Setup`, 'Ok');
    };

    this.setupService.delete(setup).subscribe({ next, error });
  }

  copySetup(event: MouseEvent, { id, name, ...setup }: Setup) {
    event.stopPropagation();

    const copyName = `${name} copy`;
    const payload = {
      ...setup,
      name: copyName,
    };

    const next = () => {
      this._snackBar.open(`${name} copied as ${copyName}`, 'Ok');
      this.setupService.refreshBatch();
    };

    const error = () => {
      this._snackBar.open(`Could not copy Setup`, 'Ok');
    };

    this.setupService.create(payload).subscribe({ next, error });
  }
}
