import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameComponent} from "../../../features/game/game.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GameComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
}
