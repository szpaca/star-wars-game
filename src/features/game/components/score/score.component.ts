import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Score} from "../../models/score";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-score',
  standalone: true,
  templateUrl: './score.component.html',
  imports: [
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent {
  @Input()
  score: Score;
}
