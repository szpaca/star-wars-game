import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {Person} from "../../models/person";
import {Starship} from "../../models/starship";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './resource-card.component.html',
  styleUrl: `./resource-card.component.scss`
})
export class ResourceCardComponent {

  @Input()
  person: Person | undefined;

  @Input()
  starship: Starship | undefined;

  @Input()
  loading: boolean;
  
}
