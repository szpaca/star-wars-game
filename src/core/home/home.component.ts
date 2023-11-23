import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameComponent} from "../../features/game/game.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GameComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
