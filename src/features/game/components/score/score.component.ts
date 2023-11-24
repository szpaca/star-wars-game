import {Component, Input} from '@angular/core';
import {Score} from "../../models/score";

@Component({
  selector: 'app-score',
  standalone: true,
  templateUrl: './score.component.html',
})
export class ScoreComponent {
  @Input()
  score: Score;
}
