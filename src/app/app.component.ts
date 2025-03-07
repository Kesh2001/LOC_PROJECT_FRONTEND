import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutocompleteComponent } from "../shared/components/autocomplete/autocomplete.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserFormComponent } from "../shared/user-form/user-form.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AutocompleteComponent, UserFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'InternshipProject1_LOC_Frontend';
}
