import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchBarComponent } from './_components/search-bar/search-bar.component';
import { SetupService } from './_services/setup.service';
import { map } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { SetupsListComponent } from './_components/setups-list/setups-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // modules
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    // components
    SearchBarComponent,
    SetupsListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'not-a-todo-app-angular';

  constructor(public setupService: SetupService) {}

  ngOnInit(): void {
    this.setupService.loadData();
  }

  onSearch(query: string) {
    this.setupService.loadData({ name: query });
  }
}
