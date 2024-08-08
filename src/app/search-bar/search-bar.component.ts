import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconButton, MatIcon],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchGroup = new FormGroup({
    search: new FormControl(),
  });

  @Output()
  onSearch = new EventEmitter<string>();

  onSubmit() {
    const { search } = this.searchGroup.value;
    this.onSearch.emit(search);
  }
}
