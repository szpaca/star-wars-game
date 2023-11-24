import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ScoreComponent} from "./score.component";
import {ROUND_RESULT} from "../../models/resource";

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;
  let playerOnePoints: HTMLElement;
  let playerTwoPoints: HTMLElement;
  let roundResult: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    component.score = {roundResult: ROUND_RESULT.PLAYER_ONE, playerOne: 5, playerTwo: 2};
    fixture.detectChanges();
    roundResult = fixture.debugElement.nativeElement.querySelector('[data-tests*="round-result"]');
    playerOnePoints = fixture.debugElement.nativeElement.querySelector('[data-tests*="player-one-points"]');
    playerTwoPoints = fixture.debugElement.nativeElement.querySelector('[data-tests*="player-two-points"]');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set correct score', () => {
    expect(playerOnePoints.textContent).toEqual('Player one: 5 points');
    expect(playerTwoPoints.textContent).toEqual('Player two: 2 points');
    expect(roundResult.textContent).toEqual('Round Winner: Player One!');
  });
});
