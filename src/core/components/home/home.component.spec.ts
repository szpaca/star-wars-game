import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {GameComponent} from "../../../features/game/game.component";
import {MockGameComponent} from "../../../shared/mocks/component.mocks";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [HomeComponent],
      })
      .overrideComponent(HomeComponent, {
        add: {
          imports: [MockGameComponent],
        },
        remove: {
          imports: [GameComponent],
        },
      });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
